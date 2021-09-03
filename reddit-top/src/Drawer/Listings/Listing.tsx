import { useCallback, useEffect, useRef, useState } from "react";
import {
  commitLocalUpdate,
  useFragment,
  useRelayEnvironment,
} from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { BsCircleFill, BsChevronRight, BsXCircle } from "react-icons/bs";

import {
  ListingFragmentGraphQL_listing$data,
  ListingFragmentGraphQL_listing$key,
} from "../../__generated__/ListingFragmentGraphQL_listing.graphql";

import { ListKToUpdate, timeAgo } from "./helpers";

const dismissConfig = {
  duration: 50,
};

interface ListProps {
  listing: ListingFragmentGraphQL_listing$key;
}

const Listing = ({ listing }: ListProps) => {
  const environment = useRelayEnvironment();
  const ListingFragmentGraphQL = graphql`
    fragment ListingFragmentGraphQL_listing on List {
      id
      title
      created
      num_comments
      thumbnail
      author
      name
      isDismissed
      isRead
    }
  `;
  const node = useFragment(ListingFragmentGraphQL, listing);

  const liRef = useRef<HTMLLIElement>(null);
  const [hasEnteredDismiss, setHasEnteredDismiss] = useState(false);
  const [height, setHeight] = useState(0);
  const [isImageLoaded, setisImageLoaded] = useState(false);
  const [isImageLoadedError, setisImageLoadedError] = useState(false);

  useEffect(() => {
    if (liRef && liRef.current && isImageLoaded) {
      const { offsetHeight } = liRef.current;
      setHeight(offsetHeight);
    } else if (liRef && liRef.current && isImageLoadedError) {
      setHeight(210);
    }
  }, [liRef, isImageLoaded, isImageLoadedError]);

  const liStyle = useSpring({
    ...(height !== 0 && { height: `${node.isDismissed ? 0 : height}px` }),
    opacity: node.isDismissed ? 0 : 1,
    fontSize: `${node.isDismissed ? 0 : 18}px`,
    width: `${node.isDismissed ? "0" : "100%"}`,
    transform: `translateX(${node.isDismissed ? -100 : 0}px)`,
    paddingTop: `${node.isDismissed ? 0 : 12}px`,
    paddingBottom: `${node.isDismissed ? 0 : 12}px`,
    paddingLeft: `${node.isDismissed ? 0 : 12}px`,
    paddingRight: `${node.isDismissed ? 0 : 6}px`,
    config: {
      duration: 500,
    },
  });

  const sharedUpdater = useCallback(
    (value: boolean, listK: ListKToUpdate, isPost: boolean) => {
      commitLocalUpdate(environment, (store) => {
        if (isPost) {
          const viewerProxy = store.getRoot().getLinkedRecord("viewer");
          if (viewerProxy) {
            const postProxy = viewerProxy.getLinkedRecord("activePost");
            if (postProxy) {
              postProxy.setValue(node.thumbnail, "thumbnail");
              postProxy.setValue(node.author, "author");
              postProxy.setValue(node.title, "title");
            }
          }
        }
        const listProxy = store.get<ListingFragmentGraphQL_listing$data>(
          node.id
        );

        if (listProxy && !listProxy.getValue(listK)) {
          listProxy.setValue(value, listK);
        }
      });
    },
    [environment, node]
  );

  const onDismiss = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      sharedUpdater(true, "isDismissed", false);
    },
    [sharedUpdater]
  );

  const onRead = useCallback(() => {
    sharedUpdater(true, "isRead", true);
  }, [sharedUpdater]);

  const dismissSpanStyle = useSpring({
    fontWeight: hasEnteredDismiss ? 600 : 400,
    config: dismissConfig,
  });

  const xIconStyle = useSpring({
    width: hasEnteredDismiss ? 18.5 : 18,
    height: hasEnteredDismiss ? 18.5 : 18,
    config: dismissConfig,
  });

  const onDismissMouseEnter = useCallback(() => {
    setHasEnteredDismiss(true);
  }, [setHasEnteredDismiss]);

  const onDismissMouseLeave = useCallback(() => {
    setHasEnteredDismiss(false);
  }, [setHasEnteredDismiss]);

  const onListingImageLoad = () => {
    setisImageLoaded(true);
  };

  const onListingImageLoadError = () => {
    setisImageLoadedError(true);
  };

  return (
    <StyledAnimatedLi
      data-testid={`@test:list:${node.id}`}
      ref={liRef}
      style={liStyle}
      onClick={onRead}>
      <TopSection>
        {!node.isRead && (
          <UnReadCircle
            size={12}
            data-testid={`@test:list:${node.id}:unreadcircle`}
          />
        )}
        <Author>{node.author}</Author>
        <Time>{timeAgo(new Date((node.created as number) * 1000))}</Time>
      </TopSection>
      <Body>
        <ListingImage
          src={node.thumbnail as string}
          onLoad={onListingImageLoad}
          onError={onListingImageLoadError}
        />
        <Title>{node.title}</Title>
        <ChevronRight size={18} />
      </Body>
      <BottomSection>
        <DismissPost
          data-testid={`@test:dismiss:list:${node.id}`}
          onMouseEnter={onDismissMouseEnter}
          onMouseLeave={onDismissMouseLeave}
          onClick={onDismiss}>
          <XIcon style={xIconStyle} />
          <StyledSpan style={dismissSpanStyle}>Dismiss Post</StyledSpan>
        </DismissPost>
        <NumComments>{node.num_comments} comments</NumComments>
      </BottomSection>
    </StyledAnimatedLi>
  );
};

export default Listing;

const NumComments = styled.span`
  ${({ theme }) => `color:${theme.orange};`}
`;

const StyledSpan = styled(animated.span)`
  color: #ffffff;
`;

const XIcon = styled(animated(BsXCircle))`
  ${({ theme }) => `color:${theme.orange};`}
  margin-right: 6px;
`;

const StyledAnimatedLi = styled(animated.li)`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  &:hover {
    background-color: #323232;
  }
`;

const DismissPost = styled(animated.div)`
  cursor: pointer;
  align-items: center;
  flex-direction: row;
  display: flex;
`;

const BottomSection = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 54px;
`;

const Title = styled.p`
  ${({ theme }) => `color:${theme.white};`}
  width: 200px;
  margin-right: 24px;
`;

const ListingImage = styled.img`
  object-fit: cover;
  width: 80px;
  margin-right: 12px;
  height: auto;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const ChevronRight = styled(BsChevronRight)`
  ${({ theme }) => `color:${theme.white};`}
`;

const UnReadCircle = styled(BsCircleFill)`
  ${({ theme }) => `color:${theme.circle};`}
  position: absolute;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const Author = styled.span`
  ${({ theme }) => `color:${theme.white};`}
  font-size: 18px;
  margin-left: 22px;
  margin-right: 12px;
`;

const Time = styled.span`
  ${({ theme }) => `color:${theme.time};`}
  font-size: 14px;
  align-self: center;
`;
