import { useLoaderData, redirect, useNavigate, Form } from "react-router-dom";

import { updateCard, getCard } from "../cards";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateCard(params.cardId, updates);
    return redirect(`/cards/${params.cardId}`);
  }

export async function loader({ params }) {
    const card = await getCard(params.cardId);
    return { card };
  }

export default function Editcard() {
    const { card } = useLoaderData();
    const navigate = useNavigate();

    return (
    <Form method="post" id="card-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Card Text"
          aria-label="Card Text"
          type="text"
          name="first"
          defaultValue={card.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={card.last}
        />
      </p>
      
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => {
            navigate(-1);
          }}>Cancel</button>
      </p>
    </Form>
  );
}