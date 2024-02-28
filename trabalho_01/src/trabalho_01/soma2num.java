package trabalho_01;
import java.util.*;


class soma2num {
	public static Scanner sc = new Scanner(System.in);
	
	public static void main(String args[]) {
		
		//variaveis
		int num1, num2, soma;
		
		//ler numeros
		System.out.println("Digite um numero");
		num1=sc.nextInt();
		System.out.println("Digite outro numero");
		num2=sc.nextInt();
		
		//Fazer soma
		soma=num1+num2;
		
		//mostrar a soma
		System.out.println("Soma:"+soma);
	}
}
