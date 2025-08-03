// // src/pages/Register.jsx
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Card,
//   Alert,
// } from "react-bootstrap";
// import API from "../api";
// import metricsImg from "../assets/Metrics.png";

// function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/register", { name, email, password });
//       navigate("/login");
//     } catch (error) {
//       setErr(error.response?.data?.message || "Pendaftaran gagal");
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{
//         minHeight: "100vh",
//         background: "#f8f9fa",
//         padding: "20px",
//         margin: 0,
//         width: "100vw",
//       }}
//     >
//       <Container fluid className="d-flex justify-content-center">
//         <Card
//           className="shadow"
//           style={{
//             maxWidth: "900px",
//             width: "100%",
//             margin: "0 auto",
//           }}
//         >
//           <Row className="g-0">
//             <Col
//               md={6}
//               className="d-flex align-items-center justify-content-center p-4 bg-light"
//             >
//               <img
//                 src={metricsImg}
//                 alt="Metrics"
//                 className="img-fluid"
//                 style={{ maxHeight: "350px" }}
//               />
//             </Col>
//             <Col md={6} className="p-4">
//               <h3 className="mb-3 fw-bold text-center">Create an Account</h3>
//               <p className="text-muted mb-4 text-center">
//                 Please register to continue
//               </p>
//               {err && <Alert variant="danger">{err}</Alert>}
//               <Form onSubmit={handleRegister}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter your name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Button type="submit" className="w-100" variant="primary">
//                   Register
//                 </Button>

//                 <p className="mt-3 text-center">
//                   Already have an account? <Link to="/login">Login here</Link>
//                 </p>
//               </Form>
//             </Col>
//           </Row>
//         </Card>
//       </Container>
//     </div>
//   );
// }

// export default Register;

// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import API from "../api";
import metricsImg from "../assets/Metrics.png";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("🔄 Starting registration process...");

    // Reset error state
    setErr("");

    try {
      console.log("📤 Sending registration request with:", {
        name,
        email,
        password: "***",
      });

      const res = await API.post("/register", { name, email, password });

      console.log("✅ Registration successful:", res.data);
      navigate("/login");
    } catch (error) {
      console.error("❌ Registration failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Pendaftaran gagal - tidak dapat terhubung ke server";
      setErr(errorMessage);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
        padding: "20px",
        margin: 0,
        width: "100vw",
      }}
    >
      <Container fluid className="d-flex justify-content-center">
        <Card
          className="shadow"
          style={{
            maxWidth: "900px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Row className="g-0">
            <Col
              md={6}
              className="d-flex align-items-center justify-content-center p-4 bg-light"
            >
              <img
                src={metricsImg}
                alt="Metrics"
                className="img-fluid"
                style={{ maxHeight: "350px" }}
              />
            </Col>
            <Col md={6} className="p-4">
              <h3 className="mb-3 fw-bold text-center">Create an Account</h3>
              <p className="text-muted mb-4 text-center">
                Please register to continue
              </p>
              {err && <Alert variant="danger">{err}</Alert>}
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="w-100" variant="primary">
                  Register
                </Button>

                <p className="mt-3 text-center">
                  Already have an account? <Link to="/login">Login here</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default Register;
