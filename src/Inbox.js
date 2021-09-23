import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    Grid, Container, ListItemSecondaryAction, Button, TextField, ListItemText, ListItem, Typography, AppBar, List, Drawer, Toolbar, Divider, CssBaseline
} from '@material-ui/core';
import data from "./Data";
import ItemListSideBar from "./DrawerItem";
import useStyles from "./ComponentCss";

export default function MainComponent() {
    const classes = useStyles();
    const [messageList, setData] = useState(data);
    const [isFlagged, setFlag] = useState(false);
    const [isFlaggedCount, setFlagCount] = useState(messageList?.filter((item) => item.isFlagged).length);
    const [isReadCount, setReadCount] = useState(messageList?.filter((item) => !item.isRead).length);
    const [isDeletedCount, setDeletedCount] = useState(messageList?.filter((item) => item.isDeleted).length);

    const updateMessage = (item, key) => {
        const found = messageList.map((found) => {
            if (item.name === found.name) {
                if (key === "isFlagged") {
                    found[key] = !found[key];
                }
                else {
                    found[key] = true;
                }
                return found;
            }
            else {
                return found;
            }
        })
        setData(found);
    }

    useEffect(() => {
        setFlagCount(messageList?.filter((item) => item.isFlagged && !item.isDeleted).length);
        setReadCount(messageList?.filter((item) => !item.isRead && !item.isDeleted).length);
        setDeletedCount(messageList?.filter((item) => item.isDeleted).length);
    }, [messageList]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Inbox
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {[{ name: "Inbox", count: isReadCount }, { name: "Flagged", count: isFlaggedCount }, { name: "Spam" }, { name: "Deleted", count: isDeletedCount }].map((item, index) => (
                        <ItemListSideBar number={messageList.length} list={item} isFlagged={setFlag} />
                    ))}
                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container>
                    <Grid item xs={6}>
                        <Container >
                            <Autocomplete
                                id="combo-box-demo"
                                options={messageList?.filter((item) => !item.isDeleted)}
                                onChange={(value) => {
                                    if (!value.target.textContent) {
                                        setData(data)
                                    } else {
                                        setData([messageList?.find((item) => item.name === value.target.textContent)]);
                                    }
                                }
                                }
                                getOptionLabel={(option) => option.name}
                                style={{ width: 300, marginLeft: 150 }}
                                renderInput={(params) => <TextField {...params} label="Search Emails" variant="outlined" />}
                            />
                            <List className={classes.list}>
                                {messageList?.map((item) => {
                                    if (!item.isDeleted && (isFlagged ? item.isFlagged : true)) return (
                                        <>
                                            <ListItem onClick={() => updateMessage(item, "isRead")} style={{ cursor: "pointer" }}>
                                                <ListItemText primary={<Typography type="body2" style={!item.isRead ? { fontWeight: "bold" } : null}>{item.name}</Typography>} secondary={item.createdOn} />
                                                <ListItemSecondaryAction>
                                                    <Button onClick={() => updateMessage(item, "isDeleted")} className={classes.button} size="small" variant="contained" color="primary">
                                                        Delete
                                                    </Button>
                                                    <Button onClick={() => updateMessage(item, "isFlagged")} size="small" variant="contained" color="primary">
                                                        {item.isFlagged ? "UNFLAG" : "FLAG"}
                                                    </Button>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider />
                                        </>
                                    )
                                })}
                            </List>
                        </Container>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                </Grid>
            </main>
        </div >
    );
}