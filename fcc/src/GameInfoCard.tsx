import React, {useState} from 'react';
import {
   Card,
   CardHeader,
   Avatar,
   IconButton,
   CardMedia,
   Typography,
   CardActions,
   CardContent,
   Collapse,
   makeStyles,
} from '@material-ui/core'
import MoreVertIcon from "@material-ui/icons/MoreVert"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import {Link} from "react-router-dom"
import './App.css';
import { isTemplateExpression } from 'typescript';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "red",
  },
}));

interface Props {
  heading: string;
  subHeading: string;
  description: string;
  imgUrl: string;
}

export const GameInfoCard = (props: Props) => {
  const {heading, subHeading, description, imgUrl} = props;

  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={heading}
        subheader={subHeading}
      />
      <Link to={`/${heading.toLowerCase()}`}>
        <CardMedia
          className={classes.media}
          image={imgUrl}
        />
      </Link>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Add more info here
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
