import "./AboutGame.css";

const AboutGame = () => {
    return (
    <section>
        <h1>About the GamesAfoot</h1>
        <p>
        GamesAfoot is a web application allows users to participate in a scavenger hunt based on real-world locations. 
        Users can input their starting location or use their current location and select the number of locations they want
        to visit within a specified radius. The app generates a list of locations using OpenAI and provides hints for the
        user to discover each location. As the user reaches each location, the next hint is revealed until the final 
        destination is found.
        </p>
        <p>
            <b>
                ***Please note that OpenAI may generate unreal locations :&#41; currently, the OpenAI prompt seems to be effectively
                generating real locations, however our team plans to integrate a locations API in the future!
            </b>
        </p>
        <h1>Team</h1>
        <div>
            <p>The GamesAfoot team consists of four developers who are passionate about creating unique and interactive web applications.</p>
            <p>The team members are:</p> 
            
            <ul className="team-info">
                <li>
                    <img src="https://github.com/JaimeMitchell.png" width={200} height={200}/>
                    <h4><a href="https://github.com/JaimeMitchell" target="_blank">Jaime Mitchell</a></h4>
                    <p>Original concept, Backend Engineer</p>
                </li>
                <li>
                    <img src="https://github.com/enigmatic-loop.png" width={200} height={200}/>
                    <h4><a href="https://github.com/enigmatic-loop" target="_blank">Nina Sohn</a></h4>
                    <p>Backend Engineer & Frontend Assist</p>
                </li>
                <li>
                    <img src="https://github.com/jennycodingnow.png" width={200} height={200}/>
                    <h4><a href="https://github.com/jennycodingnow" target="_blank">Jenny Chen</a></h4>
                    <p>Frontend Developer</p>
                </li>
                <li>
                    <img src="https://github.com/yxzhang88.png" width={200} height={200}/>
                    <a href="https://github.com/yxzhang88" target="_blank">Miranda Zhang</a>
                    <p>Frontend Developer</p>
                </li>
            </ul>  
        </div>
    </section>
    );
};

export default AboutGame;
