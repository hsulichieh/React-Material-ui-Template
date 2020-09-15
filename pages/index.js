import React from 'react'
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import GetTheme from '../src/Theme/DynamicTheme'

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 140,
  },
})

export default function Index() {
  const classes = useStyles()
  const TheTheme = createMuiTheme(GetTheme())
  return (
    <ThemeProvider theme={TheTheme}>
      <>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography component="div" style={{ height: '100vh' }}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h1" component="h2" align="center">
                    Welcome
                  </Typography>

                </CardContent>
              </CardActionArea>

            </Card>
          </Typography>

        </Container>
      </>
    </ThemeProvider>
  )
}
