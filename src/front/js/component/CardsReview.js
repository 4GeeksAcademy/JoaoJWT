import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import FormReview from "./FormReview";
import Likes from "./Likes";

const CardsReview = ({ searchQuery }) => {
  const { store, actions } = useContext(Context);
  const [editContentId, setEditContentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    actions.getReviews();
    console.log("Succes fetch for CardsReview");
  }, []);

  const handleUpdate = (id) => {
    const reviewToUpdate = store.reviews.find((review) => review.id === id);
    if (reviewToUpdate) {
      setEditContent(reviewToUpdate.comment_text);
      setEditContentId(id);
    }
  };

  const handleSave = (id) => {
    const reviewToUpdate = store.reviews.find((review) => review.id === id);
    if (reviewToUpdate) {
      reviewToUpdate.comment_text = editContent;
      setEditContent("");
      setEditContentId(null);
    }
  };

  const handleDelete = (id) => {
    actions.deleteReview(id);
    window.location.reload();
  };

  return (
    <div>
      {/* Mostrar el form de creación de reseñas sólo si el usuario está logueado y que no sea una empresa tampoco */}
      {store.user.username && <FormReview />}
      {/* Publicar las cartas que ya existen */}
      <div className="cards-review">
        {store.reviews
          .filter(
            (review) =>
              review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              review.comment_text
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
          .sort((a, b) => b.id - a.id)
          .map((review) => (
            <div
              key={review.id}
              className="card card-review text-white mt-4 container"
              style={{ height: "16rem", width: "20rem" }}
            >


              <div className="div-title-review">
                <h5 className="card-title title-review">{review.title}</h5>
              </div>
              {editContentId === review.id ? (
                <>
                  <div className="comment-review">
                    <textarea
                      autoFocus={true}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}

                      rows="7"
                      cols="38"
                      maxLength="300"
                      style={{ resize: "none" }}
                    ></textarea>
                  </div>
                  <button onClick={() => handleSave(review.id)}>
                    Validar
                  </button>
                </>
              ) : (
                <p className="card-text">{review.comment_text}</p>
              )}
              {store.user.id === review.user.id && (
                <div className="btn-options d-flex justify-content-end">
                  <button className="btn-up-review" onClick={() => handleUpdate(review.id)}>
                    &#9998;
                  </button>
                  <button className="btn-delete-review" onClick={() => handleDelete(review.id)}>
                    &#10008;
                  </button>
                </div>
              )}
              <div className="likes card-likes">
                <span className="author-review">Escrito por : <span>{review.user.username}</span> </span>
                <Likes reviewId={review.id} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardsReview;