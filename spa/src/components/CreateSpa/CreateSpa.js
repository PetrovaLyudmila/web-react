import { useForm } from '../../hooks/useForm';

export const CreateSpa = ({
    onCreateSpaSubmit,
}) => {
    const { values, changeHandler, onSubmit } = useForm({
        title: '',
        category: '',
        time: '',
        imageUrl: '',
        description: '',
    }, onCreateSpaSubmit);

    return (
        <section id="create-page" className="auth">
            <form id="create" method="post" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Create Spa</h1>

                    <label htmlFor="leg-title">Spa title:</label>
                    <input value={values.title} onChange={changeHandler} type="text" id="title" name="title" placeholder="Enter spa title..." />

                    <label htmlFor="category">Category:</label>
                    <input value={values.category} onChange={changeHandler} type="text" id="category" name="category" placeholder="Enter spa category..." />

                    <label htmlFor="times">Time:</label>
                    <input value={values.time} onChange={changeHandler} type="number" id="time" name="time" min="10" placeholder="min.." />

                    <label htmlFor="spa-img">Image:</label>
                    <input value={values.imageUrl} onChange={changeHandler} type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" value={values.description} onChange={changeHandler}></textarea>
                    <input className="btn submit" type="submit" value="Create Spa" />
                </div>
            </form>
        </section>
    );
};
