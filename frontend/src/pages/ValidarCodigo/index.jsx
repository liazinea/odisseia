import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../services/api";

const ValidarCodigo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/confirmar-codigo", data);
      alert("Senha definida com sucesso!");
      navigate("/"); // ou onde você quiser redirecionar após sucesso
    } catch (error) {
      console.log(error);
      alert("Erro ao validar código.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Validar Código</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email obrigatório" })}
            defaultValue={email}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Código recebido</label>
          <input
            type="text"
            {...register("code", { required: "Código obrigatório" })}
          />
          {errors.code && <p style={{ color: "red" }}>{errors.code.message}</p>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Nova senha</label>
          <input
            type="password"
            {...register("password", { required: "Senha obrigatória" })}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>

        <button type="submit">Salvar senha</button>
      </form>
    </div>
  );
};

export default ValidarCodigo;
