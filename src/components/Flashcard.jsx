import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Carousel, Card} from 'react-bootstrap';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { createCard, getCards } from '../cards.js';
import { Link, useLoaderData, Form, NavLink, redirect, useNavigate } from 'react-router-dom';
import Base from './Base.jsx';
import '../index.css';

export async function loader() {
    const cards = await getCards();
    return { cards };
}

export async function action() {
    const card = await createCard();
    return redirect(`/cards/${card.id}/edit`);
  }

function Flashcard() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNextClick = () => {
        setFlashcardText(`Flashcard text ${count + 1} goes here`);
        
    };

    const handlePrevClick = () => {
        setFlashcardText(`Flashcard text ${count - 1} goes here`);
        
    };

    const navigate = useNavigate();

    const handleSlide = (selectedIndex) => {
      console.log(selectedIndex);
      const nextCardId = cards[selectedIndex].id;
    navigate(`/cards/${nextCardId}`)
    };

    const carouselItems = (cards) => {
        return cards.map((card) => (
            <Carousel.Item key={card.id} className=''>
            <Card className={`flip-card ${isFlipped ? 'flipped' : ''} border-1 flex`}  onClick={handleFlip}>
              <Card.Body className="flip-card-inner">
                <Card className={`${isFlipped ? "flip-card-back" : "flip-card-front"} border-0`}>
                  <Card.Body>
                    <Card.Title className='text-sm'>{isFlipped ? card.last : card.first}</Card.Title>
                    <Card.Text>{card.text}</Card.Text>
                    <NavLink to={`/cards/${card.id}/edit`} className="btn btn-primary">Edit</NavLink>
                    <Form
                      method="post"
                      action="delete"
                      onSubmit={(event) => {
                        if (
                          !confirm(
                            "Please confirm you want to delete this record."
                          )
                        ) {
                          event.preventDefault();
                        }
                      }}
                    >
                      <button type="submit">Delete</button>
                    </Form>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ));
    }

    const {cards} = useLoaderData() 
    return (
        <>
        <div className='flex flex-col mx-auto items-center'>
        <Form method="post" className='flex justify-center'>
              <button type="submit" className=' text-base font-sans bg-blue-500 text-white px-2 py-1 rounded-md'>New</button>
        </Form>
            <h1 className='text-6xl'>Flashcard</h1>
            <Carousel 
                className=' w-6/12 h-60 mx-auto items-center justify-center'
                // nextIcon={<FaArrowRight size={30} color="black" />}
                // prevIcon={<FaArrowLeft size={30} color="black" />}
                onSlide={handleSlide}
                interval={null}
                //onClick={handleCarouselClick}
                //activeIndex={count}
                >
                {carouselItems(cards)}
                
            </Carousel>
            
        </div>
        <button onClick={handlePrevClick} className="btn btn-primary">Previous</button>
        <button onClick={handleNextClick} className="btn btn-primary">Next</button></>
        
    );
}

export default Flashcard;
