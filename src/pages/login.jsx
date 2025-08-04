// // src/pages/Login.jsx
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

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/login", { email, password });
//       localStorage.setItem("user", JSON.stringify(res.data));
//       navigate("/dashboard");
//     } catch (error) {
//       setErr(error.response?.data?.message || "Login gagal");
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
//               <h3 className="mb-3 fw-bold text-center">
//                 Welcome to ClusterInsight
//               </h3>
//               <p className="text-muted mb-4 text-center">
//                 Please sign in to your account
//               </p>
//               {err && <Alert variant="danger">{err}</Alert>}
//               <Form onSubmit={handleLogin}>
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
//                   Sign In
//                 </Button>

//                 <p className="mt-3 text-center">
//                   Don't have an account?{" "}
//                   <Link to="/register">Register here</Link>
//                 </p>
//               </Form>
//             </Col>
//           </Row>
//         </Card>
//       </Container>
//     </div>
//   );
// }

// export default Login;

// src/pages/Login.jsx
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
import API from "../service/api";
import metricsImg from "../assets/Metrics.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("🔄 Starting login process...");

    // Reset error state
    setErr("");

    try {
      console.log("📤 Sending login request with:", { email, password: "***" });
      const res = await API.post("/login", { email, password });

      console.log("✅ Login successful:", res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Login failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login gagal - tidak dapat terhubung ke server";
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
              <h3 className="mb-3 fw-bold text-center">
                Welcome to ClusterInsight
              </h3>
              <p className="text-muted mb-4 text-center">
                Please sign in to your account
              </p>
              {err && <Alert variant="danger">{err}</Alert>}
              <Form onSubmit={handleLogin}>
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
                  Sign In
                </Button>

                <p className="mt-3 text-center">
                  Don't have an account?{" "}
                  <Link to="/register">Register here</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
