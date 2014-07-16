# [ AOQTD Tap Game ] (http://www.simone-poggi.com/)

L'obiettivo e' creare un gioco tipo archmage defense in cui il giocatore e' attaccato da orde di nemici 
piu' o meno forti che avanzano verso di lui, su cui si sparano incantesimi per difendersi

Il mago sta fisso sull'albero, in un solo livello.
Hai a disposizione tutti gli incantesimi da subito e affronti una sequenza infinita di mostri.

Rimuovere i livelli, renderlo un survival game. 
A fine partita viene assegnato un punteggio (tipo scolpito sulla lapide o sul referto medico)

## TODO	

- rivedere il report (via la scritta fail, you lose: mettere un generico game over, your score is: N e sotto le stelline)
- rivedere anche la barra della vita

-----


( GRAPHICS )

	* mostri rimanenti
		necromancer
		shaman
		kamikaze (aumentare velocita')
	* Sprite dell'albero danneggiato in 3-4 fasi
	* screen iniziale:
		rifare il logo piu' grosso
		dare una passata di bianco trasparente ai nemici
		ricolorare il goblin
		rivedere anche il duergar

( CODE )

	* rivedere report View
		GZ! your score was 34! <medaglia>
		niente, wood, bronze, silver, gold, platinum, mithril
	* inserire Suoni e Musica
	* creare la funzione "stampEffect" per scritta "you win" e i punti
	
( DOPO )

	* html5 games prime, leggere ( http://buildnewgames.com/mobile-game-primer/ )

( Animazione iniziale )

	Superdrow passeggia per la foresta
	tira un calcio ad una pietra, che vola in testa ad un coboldo
	scappando sbatte contro un troll
	scappando dal troll si infila in un accampamento e nella confusione fa incazzare tutti
	per scappare sale su una catapulta e taglia la corda
	ma viene lanciato su un albero vicinissimo
	i nemici lo caricano


## LISTA MOSTRI

fatti
---------------------------------------

	Easy: 		coboldo
	Medium: 	orco
	Hard: 		troll
	Ranged: 	goblin
	Healer: 	shaman
					elementale acqua
					elementale terra
					elementale fuoco
					elementale aria
	Summoner:	necromancer
					scheletro
					ghost

da fare
---------------------------------------

	shaman
	necromancer


## BUGS

non evoca piu' i nemici, capire che minchia succede
