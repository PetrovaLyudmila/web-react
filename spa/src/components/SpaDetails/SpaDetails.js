import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { spaServiceFactory } from '../../services/spaService';
import { useService } from '../../hooks/useService';
import { AuthContext } from '../../contexts/AuthContext';

export const SpaDetails = () => {
    const { userId } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const { spaId } = useParams();
    const [spa, setSpa] = useState({});
    const spaService = useService(spaServiceFactory)
    const navigate = useNavigate();

    useEffect(() => {
        spaService.getOne(spaId)
            .then(result => {
                setSpa(result);
            })
    }, [spaId]);

    const onCommentSubmit = async (e) => {
        e.preventDefault();

        const result = await spaService.addComment(spaId, {
            username,
            comment,
        });

        setSpa(state => ({ ...state, comments: { ...state.comments, [result._id]: result } }));
        setUsername('');
        setComment('');
    };

    const isOwner = spa._ownerId === userId;

    const onDeleteClick = async () => {
        await spaService.delete(spa._id);

        // TODO: delete from state

        navigate('/catalog');
    };

    return (
        <section id="spa-details">
            <h1>Spa Details</h1>
            <div className="info-section">

                <div className="spa-header">
                    <img className="spa-img" src={spa.imageUrl} />
                    <h1>{spa.title}</h1>
                    <span className="levels">Time: {spa.time}</span>
                    <p className="type">{spa.category}</p>
                </div>

                <p className="text">{spa.summary}</p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {spa.comments && Object.values(spa.comments).map(x => (
                            <li key={x._id} className="comment">
                                <p>{x.username}: {x.comment}</p>
                            </li>
                        ))}
                    </ul>

                    {/* {!Object.values(spa.comments).length && (
                        <p className="no-comment">No comments.</p>
                    )} */}
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this spa )  --> */}
                {isOwner && (
                    <div className="buttons">
                        <Link to={`/catalog/${spa._id}/edit`} className="button">Edit</Link>
                        <button className="button" onClick={onDeleteClick}>Delete</button>
                    </div>
                )}
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current spa ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onCommentSubmit}>
                    <input type="text" name="username" placeholder='Name..' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <textarea name="comment" placeholder="Comment......" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    );
};