import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {
    ListItemSecondaryAction
} from '@material-ui/core';

export default function ItemListSideBar(props) {

    return (
        <ListItem button key={props.list.name}>
            <ListItemIcon><InboxIcon /> </ListItemIcon>
            <ListItemText onClick={() => {
                props.list.name === "Flagged" ? props.isFlagged(true) : props.isFlagged(false)
            }} primary={props.list.name} />
            <ListItemSecondaryAction>
                {props.list.count}
            </ListItemSecondaryAction>
        </ListItem>
    );
}