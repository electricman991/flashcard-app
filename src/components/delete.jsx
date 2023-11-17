import { redirect } from "react-router-dom";
import { deleteCard } from "../cards";

export async function action({ params }) {
  console.log(params);
  await deleteCard(params.cardId);
  return redirect("/");
}