package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Museus;

public class MuseusDAO {
    private Connection conexao;

    public MuseusDAO() {
        conexao = null;
    }

    public boolean conectar() {
        String driverName = "org.postgresql.Driver";
        String serverName = "localhost";
        String mydatabase = "Museus"; // Nome do banco de dados
        int porta = 5432;
        String url = "jdbc:postgresql://" + serverName + ":" + porta + "/" + mydatabase;
        String username = "ti2cc";
        String password = "ti@cc";
        try {
            Class.forName(driverName);
            conexao = java.sql.DriverManager.getConnection(url, username, password);
            return true;
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println(e.getMessage());
            return false;    
        }
    }

    public List<Museus> getAllMuseus() {
        List<Museus> museusList = new ArrayList<Museus>();
        try {
            // Alterado para "museu" ao invés de "Museus"
            String query = "SELECT * FROM \"museu\"";
            PreparedStatement stmt = conexao.prepareStatement(query);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Museus museu = new Museus();
                museu.setId(rs.getInt("id"));
                museu.setNome(rs.getString("nome"));
                museu.setDescricao(rs.getString("descricao"));
                museu.setLocalizacao(rs.getString("localizacao"));
                museusList.add(museu);
            }
            rs.close();
            stmt.close();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return museusList;
    }
    
    public boolean inserirMuseu(Museus museu) {
        try {
            System.out.println("Tentando inserir museu: " + museu.getNome());

            // Alterado para "museu" ao invés de "Museus"
            String query = "INSERT INTO \"museu\" (nome, descricao, localizacao) VALUES (?, ?, ?)";
            PreparedStatement stmt = conexao.prepareStatement(query);
            stmt.setString(1, museu.getNome());
            stmt.setString(2, museu.getDescricao());
            stmt.setString(3, museu.getLocalizacao());

            stmt.executeUpdate();
            stmt.close();

            System.out.println("Museu inserido com sucesso.");
            return true;
        } catch (SQLException e) {
            System.out.println("Erro ao inserir museu: " + e.getMessage());
            e.printStackTrace(); 
            return false;
        }
    }

}
