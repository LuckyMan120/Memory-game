import { observer } from "mobx-react";
import React from "react";
import Card, { CardContent, CardMedia } from "material-ui/Card";
// import Fade from "./animation/Fade";
import Fade from 'material-ui/transitions/Fade'
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Snackbar from 'material-ui/Snackbar';
import Slide from "material-ui/transitions/Slide";

import SCSS from './MemoryGame.module.scss'
import Flip from './animation/Flip'

const AppMenu = ({ store }) =>
  <AppBar position="static">
    <Toolbar>
      <Typography type="title" color="inherit" >
        <span className="mr2"> The Memory Game </span>
      </Typography>

      <Button color="accent" raised dense
        onClick={store.shuffle}
      >
        Shuffle
      </Button>

      <Button color="inherit" raised dense
        onClick={store.reset}
      >
        Reset
      </Button>
    </Toolbar>
  </AppBar>

@observer
class GameCard extends React.Component {
  render() {
    const { card, index, flipCard } = this.props
    return <div
      key={index}
      className="card-wrapper inline-block col-xs-4 col-sm-3 col-md-2 col-lg-2 py4"
      style={{ height: 100 }}
    >
      <div className="px2">
        <Flip
          onClick={() => flipCard(card)}
          isFaceup={!card.isFaceup}
          className="inline-block"
          front={
            <Card raised
              className={`
                ${SCSS.Card} Card-${index}
                ${card.isDone ? SCSS['Card--done'] : ''}
                ${card.isInvalid ? SCSS['Card--invalid'] : ''}
                relative
              `}
            >
              { card.isDone && <div className="stretched-overlay"/> }
              <CardMedia image={card.img} className={SCSS.CardMedia} />
            </Card>
          }
          back={
            <Card raised
              className={`${SCSS.Card} Card-${index} relative`}>
              {/* <span> {card.name} </span> */}
              <CardContent className={SCSS.CardMediaPlaceholder} />
            </Card>
          }
        />
      </div>
    </div>
  }
}

@observer
class MemoryGame extends React.Component {
  render() {
    const { store, store: { cards } } = this.props;
    window.game = this;

    return (
      <Fade in transitionDuration={{ enter: 1000 }}>
        <div>
          <AppMenu store={store}/>

          <div className="cards row">
            {cards.map((card, index) =>
              <GameCard card={card} key={index} index={index} flipCard={store.flipCard}/>
            )}
          </div>

          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={store.isGameOver}
            transition={<Slide direction={'up'} />}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span>You've won.</span>}
          />
        </div>
      </Fade>
    );
  }
}

export default MemoryGame