import {Container,Form, Button, Row, Col, Alert} from "react-bootstrap"
import signupService from './services/signup'
import { useState, useEffect, useRef } from "react"
import {useNavigate} from "react-router-dom"
import { Nav } from 'react-bootstrap'
import { Link } from "react-router-dom"
import {NavBar, padding} from "./components/NavBar";

const SignUp = ({user, setUser}) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [address, setAddress] = useState("")
  const [address2, setAddress2] = useState("")
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [zip, setZip] = useState("")
  const [submit, setSubmit] = useState("")
  const navigate = useNavigate()

  if (submit === "success") {
    setTimeout(() => {
      navigate('/')
    }, 5000)
  }
  const handleSignup = async (event) => {
    event.preventDefault()
    
    
    
    try {
      const user = await signupService.signup({
        name, lastName, email, password, username, address, address2, country, state, city, zip
    }) 
      setName(""); setLastName(""); setEmail(""); setPassword(""); setUsername(""); setAddress("");
      setAddress2(""); setCountry(""); setState(""); setCity(""); setZip("");
      setSubmit("success");
    } catch(exception) {
      setErrorMessage(exception.response.data.error)
      setSubmit("error")
    }
  }
    
    return (
        <div>
        {user === null ?
      <NavBar>
      <div>
      <Nav.Link href="#" as="span">
         <Link style={padding} to="/log-in">Log in</Link> 
         </Nav.Link>
      </div> 
      </NavBar>:
      
     <NavBar user={user} />
      }
        <Container>
        <h1 className="mt-1">Sign Up</h1>
        {(() => {
        if (submit === "success") {
          return (
            <Alert key="success" variant="success">Account created successfully</Alert>
          )
        } else if (submit === "error") {
          return (
            <Alert key="danger" variant="danger">{errorMessage}</Alert>
          )
        } 
      })()}
        <Form onSubmit={handleSignup}>
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridNames">
          <Form.Label>Names</Form.Label>
          <Form.Control required type="text" value={name} onChange={({target}) => setName(target.value)} name="name" placeholder="Enter names" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastNames">
          <Form.Label>Last Names</Form.Label>
          <Form.Control required type="text" value={lastName} onChange={({target}) => setLastName(target.value)} name="lastName" placeholder="Last names" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" value={email} onChange={({target}) => setEmail(target.value)} name="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" value={password} onChange={({target}) => setPassword(target.value)} name="password" placeholder="Password" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control required type="text" value={username} onChange={({target}) => setUsername(target.value)} name="username" placeholder="Enter username" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control required placeholder="1234 Main St" value={address} onChange={({target}) => setAddress(target.value)} name="address"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" value={address2} onChange={({target}) => setAddress2(target.value)} name="address2"/>
      </Form.Group>

      <Row className="mb-3">

      <Form.Group as={Col} controlId="formGridCountry">
          <Form.Label>Country</Form.Label>
          <Form.Select required defaultValue="Choose..." value={country} onChange={({target}) => setCountry(target.value)} name="country">
            <option>Choose...</option>
            <option value="AF">Afganist&#225;n</option>
            <option value="AL">Albania</option>
            <option value="DE">Alemania</option>
            <option value="AD">Andorra</option>
            <option value="AO">Angola</option>
            <option value="AI">Anguila</option>
            <option value="AQ">Ant&#225;rtida</option>
            <option value="AG">Antigua y Barbuda</option>
            <option value="AN">Antillas Neerlandesas</option>
            <option value="SA">Arabia Saud&#237;</option>
            <option value="DZ">Argelia</option>
            <option value="AR">Argentina</option>
            <option value="AM">Armenia</option>
            <option value="AW">Aruba</option>
            <option value="AU">Australia</option>
            <option value="AT">Austria</option>
            <option value="BS">Bahamas</option>
            <option value="BH">Bahr&#233;in</option>
            <option value="BD">Bangladesh</option>
            <option value="BB">Barbados</option>
            <option value="BE">B&#233;lgica</option>
            <option value="BZ">Belice</option>
            <option value="BJ">Ben&#237;n</option>
            <option value="BM">Bermudas</option>
            <option value="BY">Bielorrusia</option>
            <option value="BO">Bolivia</option>
            <option value="BA">Bosnia y Herzegovina</option>
            <option value="BW">Botsuana</option>
            <option value="BR">Brasil</option>
            <option value="BN">Brun&#233;i Darussalam</option>
            <option value="BG">Bulgaria</option>
            <option value="BF">Burkina Faso</option>
            <option value="BI">Burundi</option>
            <option value="BT">But&#225;n</option>
            <option value="CV">Cabo Verde</option>
            <option value="KH">Camboya</option>
            <option value="CM">Camer&#250;n</option>
            <option value="CA">Canad&#225;</option>
            <option value="BQ">Caribe Neerland&#233;s</option>
            <option value="TD">Chad</option>
            <option value="CL">Chile</option>
            <option value="CN">China</option>
            <option value="CY">Chipre</option>
            <option value="CO">Colombia</option>
            <option value="KM">Comoras</option>
            <option value="CG">Congo</option>
            <option value="KR">Corea (Rep&#250;blica de)</option>
            <option value="KP">Corea (Rep&#250;blica Popular Democr&#225;tica)</option>
            <option value="CI">Costa de Marfil</option>
            <option value="CR">Costa Rica</option>
            <option value="HR">Croacia</option>
            <option value="CU">Cuba</option>
            <option value="CW">Curazao</option>
            <option value="DK">Dinamarca</option>
            <option value="DJ">Djibouti</option>
            <option value="DM">Dominica</option>
            <option value="EC">Ecuador</option>
            <option value="US">EE.UU.</option>
            <option value="EG">Egipto</option>
            <option value="SV">El Salvador</option>
            <option value="ER">Eritrea</option>
            <option value="SK">Eslovaquia</option>
            <option value="SI">Eslovenia</option>
            <option value="ES">Espa&#241;a</option>
            <option value="EE">Estonia</option>
            <option value="ET">Etiop&#237;a</option>
            <option value="FJ">Fiji</option>
            <option value="PH">Filipinas</option>
            <option value="FI">Finlandia</option>
            <option value="FR">Francia</option>
            <option value="GM">Gambia</option>
            <option value="GE">Georgia</option>
            <option value="GH">Ghana</option>
            <option value="GI">Gibraltar</option>
            <option value="GD">Granada</option>
            <option value="GR">Grecia</option>
            <option value="GL">Groenlandia</option>
            <option value="GP">Guadalupe</option>
            <option value="GU">Guam</option>
            <option value="GT">Guatemala</option>
            <option value="GF">Guayana Francesa</option>
            <option value="GN">Guinea</option>
            <option value="GQ">Guinea Ecuatorial</option>
            <option value="GW">Guinea-Bissau</option>
            <option value="GY">Guyana</option>
            <option value="HT">Hait&#237;</option>
            <option value="HN">Honduras</option>
            <option value="HK">Hongkong, China</option>
            <option value="HU">Hungr&#237;a</option>
            <option value="IN">India</option>
            <option value="ID">Indonesia</option>
            <option value="IQ">Irak</option>
            <option value="IR">Ir&#225;n</option>
            <option value="IE">Irlanda</option>
            <option value="IS">Islandia</option>
            <option value="KY">Islas Caim&#225;n</option>
            <option value="CK">Islas Cook</option>
            <option value="FO">Islas Feroe</option>
            <option value="FK">Islas Malvinas</option>
            <option value="MP">Islas Marianas del Norte</option>
            <option value="MH">Islas Marshall</option>
            <option value="SB">Islas Salom&#243;n</option>
            <option value="VG">Islas V&#237;rgenes Brit&#225;nicas</option>
            <option value="VI">Islas V&#237;rgenes de los Estados Unidos</option>
            <option value="IL">Israel</option>
            <option value="IT">Italia</option>
            <option value="JM">Jamaica</option>
            <option value="JP">Jap&#243;n</option>
            <option value="JO">Jordania</option>
            <option value="KZ">Kazajist&#225;n</option>
            <option value="KE">Kenia</option>
            <option value="KG">Kirguizist&#225;n</option>
            <option value="KI">Kiribati</option>
            <option value="KW">Kuwait</option>
            <option value="LA">Laos</option>
            <option value="LS">Lesoto</option>
            <option value="LV">Letonia</option>
            <option value="LB">L&#237;bano</option>
            <option value="LR">Liberia</option>
            <option value="LY">Libia</option>
            <option value="LI">Liechtenstein</option>
            <option value="LT">Lituania</option>
            <option value="LU">Luxemburgo</option>
            <option value="MO">Macao, China</option>
            <option value="MK">Macedonia</option>
            <option value="MG">Madagascar</option>
            <option value="MY">Malasia</option>
            <option value="MW">Malawi</option>
            <option value="MV">Maldivas</option>
            <option value="ML">Mal&#237;</option>
            <option value="MT">Malta</option>
            <option value="MA">Marruecos</option>
            <option value="MQ">Martinica</option>
            <option value="MU">Mauricio</option>
            <option value="MR">Mauritania</option>
            <option value="YT">Mayotte</option>
            <option value="MX">M&#233;xico</option>
            <option value="FM">Micronesia</option>
            <option value="MD">Moldavia</option>
            <option value="MC">M&#243;naco</option>
            <option value="MN">Mongolia</option>
            <option value="ME">Montenegro</option>
            <option value="MS">Montserrat</option>
            <option value="MZ">Mozambique</option>
            <option value="MM">Myanmar</option>
            <option value="NA">Namibia</option>
            <option value="NR">Nauru</option>
            <option value="NP">Nepal</option>
            <option value="NI">Nicaragua</option>
            <option value="NE">N&#237;ger</option>
            <option value="NG">Nigeria</option>
            <option value="NU">Niue</option>
            <option value="NO">Noruega</option>
            <option value="NC">Nueva Caledonia</option>
            <option value="NZ">Nueva Zelanda</option>
            <option value="OM">Om&#225;n</option>
            <option value="NL">Pa&#237;ses Bajos</option>
            <option value="PK">Pakist&#225;n</option>
            <option value="PW">Palaos</option>
            <option value="PS">Palestina</option>
            <option value="PA">Panam&#225;</option>
            <option value="PG">Pap&#250;a Nueva Guinea</option>
            <option value="PY">Paraguay</option>
            <option value="PE">Per&#250;</option>
            <option value="PF">Polinesia Francesa</option>
            <option value="PL">Polonia</option>
            <option value="PT">Portugal</option>
            <option value="PR">Puerto Rico</option>
            <option value="QA">Qatar</option>
            <option value="GB">Reino Unido</option>
            <option value="CF">Rep&#250;blica Centroafricana</option>
            <option value="CZ">Rep&#250;blica Checa</option>
            <option value="AZ">Rep&#250;blica de Azerbaiy&#225;n</option>
            <option value="CD">Rep&#250;blica Democr&#225;tica del Congo</option>
            <option selected="selected" value="DO">Rep&#250;blica Dominicana</option>
            <option value="GA">Rep&#250;blica Gabonesa</option>
            <option value="RE">Reuni&#243;n</option>
            <option value="RW">Ruanda</option>
            <option value="RO">Ruman&#237;a</option>
            <option value="RU">Rusia</option>
            <option value="WS">Samoa</option>
            <option value="AS">Samoa Americana</option>
            <option value="KN">San Crist&#243;bal y Nieves</option>
            <option value="SM">San Marino</option>
            <option value="PM">San Pedro y Miquel&#243;n</option>
            <option value="VC">San Vicente y las Granadinas</option>
            <option value="SH">Santa Elena</option>
            <option value="LC">Santa Luc&#237;a</option>
            <option value="ST">Santo Tom&#233; y Pr&#237;ncipe</option>
            <option value="SN">Senegal</option>
            <option value="RS">Serbia</option>
            <option value="SC">Seychelles</option>
            <option value="SL">Sierra Leona</option>
            <option value="SG">Singapur</option>
            <option value="SX">Sint Maarten</option>
            <option value="SY">Siria</option>
            <option value="SO">Somalia</option>
            <option value="LK">Sri Lanka</option>
            <option value="SZ">Suazilandia</option>
            <option value="ZA">Sud&#225;frica</option>
            <option value="SD">Sud&#225;n</option>
            <option value="SS">Sud&#225;n del Sur</option>
            <option value="SE">Suecia</option>
            <option value="CH">Suiza</option>
            <option value="SR">Surinam</option>
            <option value="TH">Tailandia</option>
            <option value="TW">Taiw&#225;n</option>
            <option value="TZ">Tanzania</option>
            <option value="TJ">Tayikist&#225;n</option>
            <option value="TL">Timor Oriental</option>
            <option value="TG">Togo</option>
            <option value="TK">Tokelau</option>
            <option value="TO">Tonga</option>
            <option value="TT">Trinidad y Tobago</option>
            <option value="TN">T&#250;nez</option>
            <option value="TC">Turcas y Caicos</option>
            <option value="TM">Turkmenist&#225;n</option>
            <option value="TR">Turqu&#237;a</option>
            <option value="TV">Tuvalu</option>
            <option value="AE">UAE</option>
            <option value="UA">Ucrania</option>
            <option value="UG">Uganda</option>
            <option value="UY">Uruguay</option>
            <option value="UZ">Uzbekist&#225;n</option>
            <option value="VU">Vanuatu</option>
            <option value="VA">Vaticano</option>
            <option value="VE">Venezuela</option>
            <option value="VN">Vietnam</option>
            <option value="WF">Wallis y Futuna</option>
            <option value="YE">Yemen</option>
            <option value="ZM">Zambia</option>
            <option value="ZW">Zimbabue</option>
          </Form.Select>
        </Form.Group>



        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Control required value={state} onChange={({target}) => setState(target.value)} name="state"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control required value={city} onChange={({target}) => setCity(target.value)} name="city"/>
        </Form.Group>

        

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control required value={zip} onChange={({target}) => setZip(target.value)} name="zip"/>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
    </div>
    )
}

export default SignUp