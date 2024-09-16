package app;

import static spark.Spark.*;
import service.MuseusService;

public class Aplicacao {

    private static MuseusService museusService = new MuseusService();

    public static void main(String[] args) {
        // Define a porta onde a aplicação vai rodar
        port(6790);

        staticFiles.location("/public"); 

        // Rota para adicionar um novo museu (POST)
        post("/museu", (request, response) -> museusService.add(request, response));

        // Rota para listar museus, se precisar de um GET
        get("/museu", (request, response) -> {
            response.type("application/json");
            return museusService.getAll(request, response);
        });
    }
}
