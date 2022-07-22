import React from 'react';
import "./styles.css";
import users from '../data/userData.json';
const axios = require("axios");

class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      id: '',
      pass: '',
      latitude: '',
      longitude: '',
      campus: '',
      branch: '',
      batch: '',
      bio: '',
      github: '',
      linkedin: '',
      twitter: '',
      portfolio: '',
      profile:'',
      photo: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);        
    this.onChange = this.onChange.bind(this);
  }

	handleChange(e) {
		this.setState({
      [e.target.name]: e.target.value
		});
	}
  onChange(e) {
    this.setState({photo:e.target.files[0]});
  }

  handleSubmit(e) {
      e.preventDefault();
      // console.log(this.state.id);
      // console.log(users.S160111);
      // let userid=this.state.id;
      // let userpass=this.state.pass;
      // console.log(userid, userpass);
      // console.log(users.S160222);
      // console.log(Object.keys(users));

      let count = 0;
      for(let i in users)
      {
        if(i===this.state.id && users[i]===this.state.pass)
        {
          console.log("Success");
          count=0;

          const formValues = new FormData(e.target);
          const newStudent = Object.fromEntries(formValues.entries());
          delete newStudent.photo;
          console.log(newStudent);

          fetch('http://localhost:8080/users', {
              method: 'POST',
              body: JSON.stringify(newStudent),
              headers: {
                'Content-type': 'application/json'
              },
            }).then(function(response) {
              // console.log(response)
              return response.json();
            });
          break;
        }
        else{
          count++;
        }
      }
      if(count!==0)
        alert("Sorry, ID Number and SMS Password didn't match!");
      else
        alert("Ok, you're added. Go check yourself on map!");

      //photo upload
      const formData = new FormData();
      formData.append('photo',this.state.photo);
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };
      axios.post("http://localhost:8080/upload",formData,config)
          .then((response) => {
              console.log("The file is successfully uploaded");
          }).catch((error) => {
      });

      // const formValues = new FormData(e.target);
      // const newStudent = Object.fromEntries(formValues.entries());
      // console.log(newStudent);

      // fetch('http://localhost:8080/users', {
      //     method: 'POST',
      //     body: JSON.stringify(newStudent),
      //     headers: {
      //       'Content-type': 'application/json'
      //     },
      //   }).then(function(response) {
      //     // console.log(response)
      //     return response.json();
      //   });
  }

  render() {
    return (
      <div className="auth-wrapper" >
      <form onSubmit={this.handleSubmit} className="auth-inner">
        <h1><b>RGUKTians-Map</b></h1>
        <label class>
          Full Name :
          <input type="text" name="name" onChange={this.handleChange} />
        </label>
        <br />
        <label >
          Email ID :
          <input type="email" name="email" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          ID Number :
          <input type="text" name="id" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          SMS Password:
          <input type="password" name="pass" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Longitude:
          <input type="number" step="any" name="longitude" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Latitude:
          <input type="number" step="any" name="latitude" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Campus :
          <select name="campus" onChange={this.handleChange}>
            <option name=""></option>
            <option name="Srikakulam">Srikakulam</option>
            <option name="Nuzvid">Nuzvid</option>
            <option name="RKValley">RK Valley</option>
            <option name="Ongole">Ongole</option>
            <option name="Basara">Basara</option>
            <option hidden name="123">200720062001</option>
          </select>
        </label>
        <br />
        <label>
          Branch :
          <select name="branch" onChange={this.handleChange}>
            <option name=""></option>
            <option name="CSE">CSE</option>
            <option name="ECE">ECE</option>
            <option name="MECH">MECH</option>
            <option name="CIVIL">CIVIL</option>
            <option name="MME">MME</option>
            <option name="CHEM">ChE</option>
            <option hidden name="123">2007200620051</option>
          </select>
        </label>
        <br />
        <label>
          Batch :
          <select name="batch" onChange={this.handleChange}>
            <option name=""></option>
            <option name="2021">2021</option>
            <option name="2020">2020</option>
            <option name="2019">2019</option>
            <option name="2018">2018</option>
            <option name="2017">2017</option>
            <option name="2016">2016</option>
            <option name="2015">2015</option>
            <option name="2014">2014</option>
            <option name="2013">2013</option>
            <option name="2012">2012</option>
            <option name="2011">2011</option>
            <option name="2010">2010</option>
            <option name="2009">2009</option>
            <option name="2009">2008</option>
            <option hidden name="123">20072006200541</option>
          </select>
        </label>
        <br />
        <label class="bio">
          Bio : 
          <input type="textarea" name="bio" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Github:
          <input type="text" name="github" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Linkedin:
          <input type="text" name="linkedin" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Twitter:
          <input type="text" name="twitter" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Portfolio:
          <input type="text" name="portfolio" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Photo: 
          <input type="file" name="photo" onChange={this.onChange}/>
        </label>
        <br />
     <input class="formbutton" type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default StudentForm;