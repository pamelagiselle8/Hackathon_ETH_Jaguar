import React from "react";
import Comment from "../components/Comment";

function Home() {
    return (
        <div>
            <h1>Inicio</h1>
            <Comment
                avatarSrc="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                authorName="Jacob Warnhalter"
                timeAgo="10 minutes ago"
                // content='<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>'
                content='Contenido'
            />
        </div>
    );
}

export default Home;