# [ AOQTD Tap Game ] (http://www.simone-poggi.com/)

L'obiettivo e' creare un gioco tipo archmage defense in cui il giocatore e' attaccato da orde di nemici 
piu' o meno forti che avanzano verso di lui, su cui si sparano incantesimi per difendersi

Il mago sta fisso sull'albero, in un solo livello.
Hai a disposizione tutti gli incantesimi da subito e affronti una sequenza infinita di mostri.

Rimuovere i livelli, renderlo un survival game. 
A fine partita viene assegnato un punteggio (tipo scolpito sulla lapide o sul referto medico)

## TODO	

- waves infinite ogni tot cicli
- aggiungere
	kill counter
- togliere 
	pozioni di vita
	wave counter
	schermata livelli
	mostri extra (ladro e nano esplosivo)
- disegnare ultimi mostri
- mostrare counter mostri uccisi

-----


( GRAPHICS )

	* mostri rimanenti
	* Sprite dell'albero danneggiato in 3-4 fasi
	* screen iniziale:
		rifare il logo piu' grosso
		dare una passata di bianco trasparente ai nemici
		ricolorare il goblin
		rivedere anche il duergar

( CODE )

	* inserire Suoni e Musica
	* creare la funzione "stampEffect" per scritta "you win" e i punti
	
( DOPO )

	* html5 games prime, leggere ( http://buildnewgames.com/mobile-game-primer/ )

( Animazione iniziale )

	1. Superdrow raggiunge i suoi amici alla locanda, tutto sorridente, aspetta un po', gli amici lo ignorano
	2. [primo piano] "I've found the way to become the most powerful mage in the world!!"
	3. gli amici si guardano
	4. sd2 srotola un foglio blu con il piano
	5. visuale del foglio con il piano disegnato e il dito che segue le fasi:
	    - poke an enemy
	    - run like hell
	    - go high (jump on a tree or something)
	    - kill everything
	    - ????
	    - profit
	6. amici perplessi, scoppiano a ridere
	7. sd2 si allontana offeso, per poi voltarsi minaccioso
	8. "WE'LL SEE WHEN I'LL BE... THE BEST MAGE EVER!!1!" logo copertina fica ecc
	9. Si chiude nel cesso, passa un po', poi "crap"


## LISTA MOSTRI

fatti
---------------------------------------

// melee
	coboldo
	orco
	elementale acqua
	elementale terra
	elementale fuoco
	elementale aria
	troll
	scheletro

// ranged
	goblin
	ghost

da fare
---------------------------------------
    // ranged
drow 			// sr
giant

	// caster
rakshasa    	// evocatore (elementali) HARD
imp
ogre magi

necromancer		// evocatore (dretch) EASY

	// healer
duergar 		// healer, sr

    // melee
zombie
melma
ghoul
ogre
mummia
bulette
shadow
minotauro

golem argilla
golem ferro
gigante

	// custom
giant turtle    // fase invulnerabilita'
luci fatue		// fase inisibilita'
blink dog		// teleport

Rivista lista dei nemici, classificandoli per tipo

			Easy			Medium			Hard
-------------------------------------------------------
Melee		coboldo			orco			troll
			elem			scheletro		golem
			dretch			zombie			minotauro
Ranged		goblin			drow			giant
Caster		imp				dragonkind		rakshaaza
Healer		duergar			evil cleric		-
Summoner	vrock			necromancer		vampiro


## BUGS

non evoca piu' i nemici, capire che minchia succede
