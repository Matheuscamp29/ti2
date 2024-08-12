package com.ti2cc;
public class Museus {
    private int codigo;
    private String nome;
    private String descricao;
    private String localizacao;

    public Museus() {
        this.codigo = -1; 
        this.nome = "";
        this.descricao = "";
        this.localizacao = "";
    }

    public Museus(String nome, String descricao, String localizacao) {
        this.nome = nome;
        this.descricao = descricao;
        this.localizacao = localizacao;
    }

    public Museus(int codigo, String nome, String descricao, String localizacao) {
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
        this.localizacao = localizacao;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    @Override
    public String toString() {
        return "Museus [codigo=" + codigo + ", nome=" + nome + ", descricao=" + descricao + ", localizacao=" + localizacao + "]";
    }
}
