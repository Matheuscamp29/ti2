package service;

import java.util.List;

import com.google.gson.Gson;

import dao.MuseusDAO;
import model.Museus;
import spark.Request;
import spark.Response;

public class MuseusService {
    private MuseusDAO museusDAO;

    public MuseusService() {
        museusDAO = new MuseusDAO();
        museusDAO.conectar();  // Certifique-se de que a conexão está correta
    }

    public Object add(Request request, Response response) {
        // Ler o JSON recebido
        Museus museu = new Gson().fromJson(request.body(), Museus.class);

        // Processar e inserir o museu
        if (museusDAO.inserirMuseu(museu)) {
            response.status(201); // HTTP Created
            return "Museu cadastrado com sucesso.";
        } else {
            response.status(500); // Internal Server Error
            return "Erro ao cadastrar o museu.";
        }
    }


    public Object getAll(Request request, Response response) {
        List<Museus> museusList = museusDAO.getAllMuseus();
        
        if (museusList != null) {
            response.status(200); // HTTP OK
            response.type("application/json"); // Define o tipo de retorno como JSON
            return new Gson().toJson(museusList); // Converte a lista para JSON
        } else {
            response.status(404); // HTTP Not Found
            return "Nenhum museu encontrado.";
        }
    }

}
