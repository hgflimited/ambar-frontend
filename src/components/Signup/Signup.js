import React from 'react'
import { Card, CardText } from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { AuthPageTemplate } from 'components/BasicComponents'
import { Link } from 'react-router'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import classes from './Signup.scss'

export class Signup extends React.Component {
  componentDidMount() {
    const { setAppTitle, tryToIdentifyUser, location } = this.props
    setAppTitle('Ambar Signup')    
    tryToIdentifyUser(location.query.id)

    if (this.refs.emailInputField) {
      this.refs.emailInputField.focus()
    }
  }

  render() {
    const {
      mode,
      fetching,
      performSignup,
      email,
      name,
      langAnalyzer,
      changeEmail,
      changeName,
      changeLangAnalyzer,
      nameError,
      emailError } = this.props

    return (<AuthPageTemplate>
      <CardText style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', paddingBottom: '0' }}>
        <h2 style={{ textAlign: 'center', color: '#00acc1', marginTop: 0 }}>Signup</h2>
        <TextField
          fullWidth={true}
          hintText="Email"
          value={email}
          disabled={fetching}
          errorText={emailError}
          ref='emailInputField'
          onChange={(event, value) => changeEmail(value)}
          onKeyPress={(target) => { if (target.charCode === 13) { performSignup() } }}
        />
        <TextField
          fullWidth={true}
          hintText="Name"
          value={name}
          disabled={fetching}
          errorText={nameError}
          onChange={(event, value) => changeName(value)}
          onKeyPress={(target) => { if (target.charCode === 13) { performSignup() } }}
        />
        {mode === 'cloud' && <SelectField
          floatingLabelText="Language Analyzer"
          fullWidth={true}
          value={langAnalyzer}
          onChange={(event, index, value) => changeLangAnalyzer(value)}>
          <MenuItem value={'ambar_en'} primaryText="English" />
          <MenuItem value={'ambar_ru'} primaryText="Russian" />
          <MenuItem value={'ambar_de'} primaryText="German" />
          <MenuItem value={'ambar_it'} primaryText="Italian" />
          <MenuItem value={'ambar_cjk'} primaryText="CJK" />
        </SelectField>}
      </CardText>
      <CardText style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <RaisedButton
          secondary={true}
          fullWidth={true}
          disabled={fetching}
          label='Signup'
          onTouchTap={() => performSignup()}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Link className={classes.link} to="/login">Already have an account?</Link>
        </div>
      </CardText>
    </AuthPageTemplate>)
  }
}

Signup.propTypes = {
  mode: React.PropTypes.string,
  performSignup: React.PropTypes.func.isRequired,
  tryToIdentifyUser: React.PropTypes.func.isRequired,
  fetching: React.PropTypes.bool,
  name: React.PropTypes.string,
  email: React.PropTypes.string,
  langAnalyzer: React.PropTypes.string,
  changeEmail: React.PropTypes.func.isRequired,
  changeName: React.PropTypes.func.isRequired,
  changeLangAnalyzer: React.PropTypes.func.isRequired,
  nameError: React.PropTypes.string.isRequired,
  emailError: React.PropTypes.string.isRequired
}

export default Signup
