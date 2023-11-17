
import React from 'react';
import Base from './Base';
import Flashcard from './Flashcard';
import { Outlet, useLoaderData, Form, NavLink, redirect} from 'react-router-dom';
import { getCards, createCard } from '../cards';
import '../index.css';


export async function loader() {
    const cards = await getCards();
    return { cards };
}

function Home() {
    const { cards } = useLoaderData();
  return (
    <>
    <div className='bg-green-200'>
      <Base />
      <h1 className='py-4 text-lg flex justify-center'>Welcome to the Home Page!</h1>
      <p className='text-lg justify-center flex'>This is the home page of our app.</p>

    {/* <nav>
          {cards.length ? (
            <ul>
              {cards.map((card) => (
                <li key={card.id}>
                  <NavLink
                    to={`cards/${card.id}/edit`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {card.first || card.last ? (
                      <>
                        {card.first} {card.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {card.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No cards</i>
            </p>
          )}
          </nav> */}
    
    {<Flashcard /> ? <Flashcard /> : <Outlet />}
    </div>
    </>
  );
}

export default Home;
