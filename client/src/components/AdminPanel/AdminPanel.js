import './AdminPanel.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


export function AdminPanel() {
    const [menuOpen, setMenuOpen] = useState(false)

    const list = () => (
        <div
            role="presentation"
            onClick={()=> setMenuOpen(false)}
            onKeyDown={()=> setMenuOpen(false)}
        >
            <List>
            {["Add user", "Add course"].map((text) => (
                <ListItem button key={text}>
                    <ListItemText primary={text}/>
                </ListItem>
            ))}
            </List>
        </div>
    )

    return (
        <div className="adminPanel">
            <Button onClick={()=> setMenuOpen(true)}>
                <MenuIcon></MenuIcon>
            </Button>
            <h4>
                Panel Admina
            </h4>
            <Drawer anchor={"left"} open={menuOpen} onClose={()=> setMenuOpen(false)}>
                {list()}
            </Drawer>
        </div>
    );
}