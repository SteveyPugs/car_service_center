import React, { Component } from 'react';

class Forgot extends Component {
    handlePasswordReset = (event) => {
        event.preventDefault();
        if(event.target.checkValidity()){
            fetch('/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserEmail: event.target.UserEmail.value
                })
            }).then((resp) => resp.json()).then(response => {
                if(response){
                    alert('Your password reset link has been sent. You will recieve a link in your email')
                }
            })
        }
    }
    render(){
        return(
            <div>
                <br/>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-4 offset-4">
                        <div className="card">
                            <div className="card-header text-center">Forgot Password</div>
                            <div className="card-body">
                                <form onSubmit={this.handlePasswordReset} className="needs-validation" noValidate>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input required type="email" className="form-control" id="UserEmail" placeholder="john.doe@example.com" />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-sm btn-block">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        )
    }
}

export default Forgot;