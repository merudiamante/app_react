import React from "react";
import NavListItem from "../components/NavListItem";
import navListData from "../data/navListData";
import { IonButton, IonIcon } from '@ionic/react';
import { contactOutline } from 'ionicons/icons';

function Header( ) {
    return(
     <header>
        <ul className="nav">
            {
                navListData.map(nav=>(
                    <NavListItem key={nav._id} nav={nav}/>
                ))
            }
        </ul>
        <Button icon={ion-icon name="contact"></ion-icon>} name="usuario" />
     </header>
    );
}

export default Header;