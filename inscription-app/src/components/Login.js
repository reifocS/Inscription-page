import React, { Component } from "react";
import { authentificate } from '../api';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: { value: '' },
            password: { value: '' }
        };
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    updateEmail(event) {
        this.setState({ email: { value: event.target.value } });
    }

    updatePassword(event) {
        this.setState({ password: { value: event.target.value } });
    }
    /**
     * callback to reset the form
     */
    cancelCourse = () => {
        this.myFormRef.reset();
    }

    async onSubmit(event) {
        event.preventDefault();
        let email = this.state.email.value;
        let password = this.state.password.value;
        let user = {
            'email': email,
            'password': password
        }
        let response = await authentificate(user);
        console.log(response)
        this.setState({ isLoggedIn: response }, this.cancelCourse);
    }

    render() {
        let loggedIn = this.state.isLoggedIn;
        return (
            <div>
                <form ref={(el) => this.myFormRef = el} onSubmit={this.onSubmit} className="form-row">
                    <div className="form-group col-md-5">
                        <label>Adresse e-mail ou mobile</label>
                        <input type="text" value={this.state.email.value} onChange={this.updateEmail} className="form-control" placeholder="Votre email" required />
                    </div>
                    <div className="form-group col-md-5">
                        <label>Mot de passe</label>
                        <input type="password" value={this.state.password.value} onChange={this.updatePassword} className="form-control" placeholder="Votre mot de passe" required />
                    </div>
                    <div className="form-group col-md-2">
                        <label>&nbsp;</label>
                        <button type="submit" className="form-control btn btn-primary"> Connexion </button>
                    </div>
                </form>
                {loggedIn !== undefined && <p>{loggedIn ? loggedIn : "identifiant ou mot de passe incorrect"}</p>}
            </div>
        );
    }
}
