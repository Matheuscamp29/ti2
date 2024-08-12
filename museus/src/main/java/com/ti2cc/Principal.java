package com.ti2cc;

import java.util.Scanner;

public class Principal {
    public static void main(String[] args) {
        DAO dao = new DAO();
        dao.conectar();

        Scanner scanner = new Scanner(System.in);
        int opcao;

        do {
            System.out.println("1 = Mostrar Museus, 2 = Inserir Museu, 3 = Excluir Museu, 4 = Atualizar Museu, 5 = Sair");
            opcao = scanner.nextInt();
            scanner.nextLine();

            switch (opcao) {
                case 1:
                    // Mostrar museus
                    Museus[] museus = dao.getMuseus();
                    System.out.println("==== Mostrar Museus ===");
                    for (Museus m : museus) {
                        System.out.println(m.toString());
                    }
                    break;

                case 2:
                	// Inserir um novo museu
                    System.out.print("Número do código: ");
                    int codigo = scanner.nextInt();
                    scanner.nextLine();
                    System.out.print("Nome do museu: ");
                    String nome = scanner.nextLine();
                    System.out.print("Descrição do museu: ");
                    String descricao = scanner.nextLine();
                    System.out.print("Localização do museu: ");
                    String localizacao = scanner.nextLine();

                    Museus novoMuseu = new Museus(codigo, nome, descricao, localizacao);
                 
            		if(dao.inserirMuseu(novoMuseu) == true) {
            			System.out.println("Inserção com sucesso -> " + novoMuseu.toString());
            		}
            		

            		break;
                case 3:
                    // Excluir museu
                    System.out.print("Código do museu a ser excluído: ");
                    int codigoExcluir = scanner.nextInt();
                    if (dao.excluirMuseu(codigoExcluir)) {
                        System.out.println("Museu excluído com sucesso.");
                    }
                    break;

                case 4:
                    // Atualizar museu
                    System.out.print("Código do museu a ser atualizado: ");
                    int codigoAtualizar = scanner.nextInt();
                    scanner.nextLine(); 
                    System.out.print("Novo nome do museu: ");
                    String novoNome = scanner.nextLine();
                    System.out.print("Nova descrição do museu: ");
                    String novaDescricao = scanner.nextLine();
                    System.out.print("Nova localização do museu: ");
                    String novaLocalizacao = scanner.nextLine();

                    Museus museuAtualizado = new Museus(codigoAtualizar, novoNome, novaDescricao, novaLocalizacao);
                    if (dao.atualizarMuseu(museuAtualizado)) {
                        System.out.println("Atualização com sucesso -> " + museuAtualizado.toString());
                    }
                    break;

                case 5:
                    dao.close();
                    System.out.println("Saindo");
                    break;

                default:
                    System.out.println("Opção inválida!");
                    break;
            }
        } while (opcao != 5);

        scanner.close();
    }
}
