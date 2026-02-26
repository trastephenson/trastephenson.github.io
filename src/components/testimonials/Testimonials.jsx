import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MAGESH from '../../assets/magesh.jpg';
import BERT from '../../assets/bert.jpg';
import ARYAN from '../../assets/aryan.jpg';
import SAM from '../../assets/sam.jpg';
import ANIRBAN from '../../assets/anirban.jpg';

const TestimonialsContainer = styled.section`
  text-align: center;
  width: 100%;
`;

const SectionTitle = styled.h2`
  color: var(--accent);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  text-shadow:
    0 1px 0 rgba(255,255,255,0.6),
    0 2px 0 rgba(0,100,180,0.15),
    0 3px 8px rgba(0,136,204,0.12);
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  overflow: hidden;
`;

const Slide = styled.div`
  opacity: ${props => props.$active ? 1 : 0};
  transform: ${props => props.$active ? 'scale(1) translateX(0)' : 'scale(0.95) translateX(20px)'};
  transition: all 0.6s ease;
  position: ${props => props.$active ? 'relative' : 'absolute'};
  top: 0;
  left: 0;
  width: 100%;
`;

const TestimonialCard = styled.div`
  background: linear-gradient(145deg, rgba(255,255,255,0.38) 0%, rgba(247,249,255,0.30) 100%);
  backdrop-filter: blur(28px) saturate(200%) brightness(112%);
  -webkit-backdrop-filter: blur(28px) saturate(200%) brightness(112%);
  border: 1px solid rgba(255,255,255,0.78);
  border-top: 1.5px solid rgba(255,255,255,0.97);
  border-radius: 20px;
  padding: 2rem;
  text-align: left;
  box-shadow:
    0 8px 32px rgba(0,0,0,0.07),
    0 2px 8px rgba(0,0,0,0.04),
    inset 0 1.5px 0 rgba(255,255,255,0.97),
    inset 0 -1px 0 rgba(255,255,255,0.32);

  @media (max-width: 600px) {
    padding: 1.2rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(0, 136, 204, 0.15);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Name = styled.p`
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
`;

const JobTitle = styled.p`
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-style: italic;
  margin-top: 0.15rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.15rem;
  color: var(--accent);
  margin-bottom: 0.25rem;

  svg {
    width: 0.9rem;
    height: 0.9rem;
  }
`;

const ReviewText = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  max-height: 160px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 136, 204, 0.15);
    border-radius: 2px;
  }
`;

const DotRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const DotButton = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${props => props.$active ? 'var(--accent)' : 'rgba(0, 136, 204, 0.2)'};
  box-shadow: ${props => props.$active ? '0 0 8px var(--accent-glow)' : 'none'};
  transition: all 0.3s ease;
  padding: 0;
`;

const data = [
  {
    avatar: MAGESH,
    name: 'Magesh',
    jobTitle: 'QA Lead at Fidelity',
    review: '"I\'ve had a pleasure of working with Travis and can confidently say they are a highly skilled, dedicated professional. Their ability to manage projects efficiently, communicate effectively, and solve problems proactively sets them apart."',
    rating: 5,
  },
  {
    avatar: BERT,
    name: 'Bert Curtis',
    jobTitle: 'Senior SDET',
    review: '"It has been a pleasure to see Travis as he develops his full stack software development skills. He consistently demonstrates a passion for learning and problem-solving, with a strong grasp of both front-end and back-end technologies."',
    rating: 5,
  },
  {
    avatar: ARYAN,
    name: 'Aryan Basak',
    jobTitle: 'Project Manager @ Utah Tech Labs',
    review: '"Travis excels at managing complex projects with a keen eye for detail and a strong commitment to Agile principles. His ability to foster collaboration within the team and drive projects to successful completion is truly impressive."',
    rating: 5,
  },
  {
    avatar: SAM,
    name: 'Sammuel Syphrett',
    jobTitle: 'Concrete Paving Estimator',
    review: '"As a supervisor, Travis has consistently demonstrated exceptional leadership and humility. His ability to explain complex concepts clearly and effectively makes him an invaluable asset to any team."',
    rating: 5,
  },
  {
    avatar: ANIRBAN,
    name: 'Anirban Dutta',
    jobTitle: 'Python Data Engineer',
    review: '"Travis is a well organised Project Manager who has lots of experience in handling clients. He is a great team player and always keeps the team spirit high."',
    rating: 5,
  },
];

const renderStars = (count) =>
  Array.from({ length: count }, (_, i) => (
    <svg key={i} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ));

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TestimonialsContainer>
      <SectionTitle>Recommendations</SectionTitle>
      <SliderWrapper>
        {data.map((item, index) => (
          <Slide key={index} $active={activeIndex === index}>
            <TestimonialCard>
              <CardHeader>
                <Avatar>
                  <img src={item.avatar} alt={item.name} />
                </Avatar>
                <div>
                  <Stars>{renderStars(item.rating)}</Stars>
                  <Name>{item.name}</Name>
                  <JobTitle>{item.jobTitle}</JobTitle>
                </div>
              </CardHeader>
              <ReviewText>{item.review}</ReviewText>
            </TestimonialCard>
          </Slide>
        ))}
      </SliderWrapper>
      <DotRow>
        {data.map((_, i) => (
          <DotButton
            key={i}
            $active={i === activeIndex}
            onClick={() => setActiveIndex(i)}
            aria-label={`View testimonial ${i + 1}`}
          />
        ))}
      </DotRow>
    </TestimonialsContainer>
  );
};

export default Testimonials;
