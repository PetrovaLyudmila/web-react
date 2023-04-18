import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { useService } from "../../hooks/useService";
import { spaServiceFactory } from "../../services/spaService";

export const EditSpa = ({
    onSpaEditSubmit,
}) => {
    const { spaId } = useParams();
    const spaService = useService(spaServiceFactory);
    const { values, changeHandler, onSubmit, changeValues } = useForm({
        _id: '',
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: '',
    }, onSpaEditSubmit);

    useEffect(() => {
        spaService.getOne(spaId)
            .then(result => {
                changeValues(result);
            });
    }, [spaId]);

    return (
        <section id="edit-page" className="auth">
            <form id="edit" method="post" onSubmit={onSubmit}>
                <div className="container">

                    <h1>Edit spa</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={changeHandler}
                    />

                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={values.category}
                        onChange={changeHandler}
                    />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min="1"
                        value={values.maxLevel}
                        onChange={changeHandler}
                    />

                    <label htmlFor="spa-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={values.imageUrl}
                        onChange={changeHandler}
                    />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" value={values.summary} onChange={changeHandler}></textarea>
                    <input className="btn submit" type="submit" value="Edit spa" />

                </div>
            </form>
        </section>
    );
};