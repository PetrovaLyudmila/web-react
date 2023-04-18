export const Home = () => {
    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new spa</h2>
                <h3>Book your spa</h3>
            </div>
            <img src="https://p.kindpng.com/picc/s/172-1720925_toallas-spa-png-transparent-png.png" alt="spa" />

            <div id="home-page">
                <h1>Latest Spa</h1>

               
                <div className="spa">
                    <div className="image-wrap">
                        <img src="./images/CoverFire.png" />
                    </div>
                    <h3>Cover Fire</h3>
                    <div className="rating">
                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                    </div>
                    <div className="data-buttons">
                        <a href="/details" className="btn details-btn">Details</a>
                    </div>
                </div>
                <div className="spa">
                    <div className="image-wrap">
                        <img src="./images/ZombieLang.png" />
                    </div>
                    <h3>Zombie Lang</h3>
                    <div className="rating">
                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                    </div>
                    <div className="data-buttons">
                        <a href="#" className="btn details-btn">Details</a>
                    </div>
                </div>
                <div className="spa">
                    <div className="image-wrap">
                        <img src="./images/MineCraft.png" />
                    </div>
                    <h3>MineCraft</h3>
                    <div className="rating">
                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                    </div>
                    <div className="data-buttons">
                        <a href="#" className="btn details-btn">Details</a>
                    </div>
                </div>

    
                <p className="no-articles">No spa yet</p>
            </div>
        </section>
    );
}