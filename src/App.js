import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PermanentDrawerLeft from './Inbox';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PermanentDrawerLeft />
    </div>
  );
}