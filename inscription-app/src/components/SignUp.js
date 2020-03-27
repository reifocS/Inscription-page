import React, { Component } from "react";
import { createUser } from '../api'

export default class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            firstname: null,
            lastname: null,
            birthday: null,
            gender: null,
            confirmEmail: null,
            errors: {
                confirmEmail: null
            },
            infoMessage: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.baseState = this.state;
    }
    /**
      * callback to reset the form
      */
    cancelCourse = () => {
        this.myFormRef.reset();
    }

    resetState = () => {
        this.setState(this.baseState)
    }

    async onSubmit(event) {
        event.preventDefault();
        if (this.state.email !== this.state.confirmEmail) {
            this.setState({ errors: {confirmEmail : "les emails ne correspondent pas." }});

            return;
        }
        this.setState({ errors: {confirmEmail : null }});
        let user = {
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            birthday: this.state.birthday,
            gender: this.state.gender
        }
        let response = await createUser(user);
        console.log(response);
        let result = response ? "Inscription réussie" : "Cet email existe déjà";
        if (response) {
            this.cancelCourse();
            this.resetState();
        }
        this.setState({ infoMessage: result });

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <form ref={(el) => this.myFormRef = el} onSubmit={this.onSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input type="text" value={this.state.firstname} onChange={this.handleChange} className="form-control" name="firstname" placeholder="Prénom" required />
                    </div>
                    <div className="form-group col-md-6">
                        <input type="text" value={this.state.lastname} onChange={this.handleChange} className="form-control" name="lastname" placeholder="Nom de famille" required />
                    </div>
                </div>
                <div className="form-group">
                    <input type="email" value={this.state.email} onChange={this.handleChange} className="form-control mb-3" name="email" placeholder="Adresse e-mail" required />
                    {this.state.errors.confirmEmail && <span className="err">{this.state.errors.confirmEmail}</span>}
                    <input type="email" value={this.state.confirmEmail} onChange={this.handleChange} className="form-control mb-3" name="confirmEmail" placeholder="Confirmer votre e-mail"
                        required />
                    <input type="password" value={this.state.password} onChange={this.handleChange} className="form-control mb-3" name="password" placeholder="Mot de passe" required />
                    <div className="col-md-4">
                        <label htmlFor="inputBirthdate">Date de naissance</label>
                        <input type="date" value={this.state.birthday} onChange={this.handleChange} className="form-control mb-3" name="birthday" placeholder="JJ/MM/AAAA" required />
                        <div className="form-check mb-3">
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" onChange={this.handleChange} id="customRadioInline1" name="gender" value="male" className="custom-control-input" required />
                                <label className="custom-control-label" htmlFor="customRadioInline1">Homme</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" onChange={this.handleChange} id="customRadioInline2" name="gender" value="female" className="custom-control-input" />
                                <label className="custom-control-label" htmlFor="customRadioInline2">Femme</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <span className="pb-2">{this.state.infoMessage}</span>
                </div>
                <button type="submit" className="btn btn-success btn-lg ml-3">Inscription</button>
            </form>
        );
    }
}
