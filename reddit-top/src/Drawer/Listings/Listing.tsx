import { useEffect, useRef, useState } from "react";
import { graphql, useFragment } from "react-relay";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { BsCircleFill, BsChevronRight, BsXCircle } from "react-icons/bs";

import { ListingFragmentGraphQL_listing$key } from "../../__generated__/ListingFragmentGraphQL_listing.graphql";

import { timeAgo } from "./helpers";

interface ListProps {
  listing: ListingFragmentGraphQL_listing$key;
}

const Listing = ({ listing }: ListProps) => {
  const node = useFragment(ListingFragmentGraphQL, listing);

  const liRef = useRef<HTMLLIElement>(null);
  const [read, setRead] = useState(false);
  const [height, setHeight] = useState(0);
  const [dismiss, setDimiss] = useState(false);
  const [isImageLoaded, setisImageLoaded] = useState(false);

  useEffect(() => {
    if (liRef && liRef.current && isImageLoaded) {
      const { offsetHeight } = liRef.current;
      setHeight(offsetHeight);
    }
  }, [liRef, isImageLoaded]);

  const style = useSpring({
    ...(height !== 0 && { height: `${dismiss ? 0 : height}px` }),
    opacity: dismiss ? 0 : 1,
    fontSize: `${dismiss ? 0 : 18}px`,
    transform: `translateX(${dismiss ? -100 : 0}px)`,
    config: {
      duration: 500,
    },
  });

  return (
    <StyledAnimatedLi ref={liRef} style={style}>
      <TopSection>
        {!read && <UnReadCircle size={12} />}
        <Author>{node.author}</Author>
        <Time>{timeAgo(new Date((node.created as number) * 1000))}</Time>
      </TopSection>
      <Body>
        <ListingImage
          src={node.thumbnail as string}
          onLoad={() => {
            setisImageLoaded(true);
          }}
        />
        <Title>{node.title}</Title>
        <ChevronRight size={18} />
      </Body>
      <BottomSection>
        <DismissPost
          onClick={() => {
            setDimiss(true);
          }}>
          <XIcon size={18} />
          <StyledSpan>Dismiss Post</StyledSpan>
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

const StyledSpan = styled.span`
  color: #ffffff;
`;

const XIcon = styled(BsXCircle)`
  ${({ theme }) => `color:${theme.orange};`}
`;

const DismissPost = styled.div`
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
  width: 250px;
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

const StyledAnimatedLi = styled(animated.li)`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const ListingFragmentGraphQL = graphql`
  fragment ListingFragmentGraphQL_listing on List {
    id
    title
    created
    num_comments
    thumbnail
    author
    name
  }
`;
