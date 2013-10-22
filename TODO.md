# [ AOQTD Tap Game ] (http://www.simone-poggi.com/)

L'obiettivo e' creare un gioco tipo archmage defense in cui il giocatore e' attaccato da orde di nemici 
piu' o meno forti che avanzano verso di lui, su cui si sparano incantesimi per difendersi

## TODO

 * On game over: reset della scena (rimuovere attori e timers)
 * cambiare l'ultimo incantesimo

( CAAGE )

	* controllare/rivedere la velocita' di enemies e spells come in projectile

( GRAPHICS )

	* UI: creare la funzione "stampEffect" per scritta "you win" e i px
	* mostri rimanenti
	* Sprite dell'albero per ogni livello
	* Sprite dell'albero danneggiato in 3-4 fasi
	* screen iniziale:
		dare una passata di bianco trasparente ai nemici
		ricolorare il goblin
	* animare il banner new Level! (magari cambiare colori)

( CODE )

	* Suoni / Musica
	* sistemare UI
	* sistemare nemici
	* sistemare difficolta'
	* classi di mostro (humanoid, undead, beast, construct)
		hanno effetto sui dv, danni
	* implementare il boss fight
		comportamenti scriptati, con strategia da ripetere tre volte, stile vecchi giochi	

( DOPO )

	* Se uno sblocca tutti i livelli a tre stelle, accede al "nerd's nirvana": 
       il livello nascosto (mucche) survival mode con sempre piu' mucche
    * Oggetti utilizzabili (raccolgo la pozione del mana e mi compare un pulsante extra, quando ci clicco uso l'oggetto)
    * integrare backbone
	* documentare il codice
	* pensare ad un modello con cui specializzi il protagonista o compri oggetti
	* rifare main.js per rispecchiare lo schema di sumon
	* html5 games prime, leggere ( http://buildnewgames.com/mobile-game-primer/ )
	* Animazione iniziale:

		1. Superdrow raggiunge i suoi amici alla locanda, tutto sorridente, aspetta un po', gli amici lo ignorano
		2. [primo piano] "I've found the way to become the most powerful mage in the world!!"
		3. gli amici si guardano
		4. sd2 srotola un foglio blu con il piano
		5. visuale del foglio con il piano disegnato e il dito che segue le fasi:
		    - poke an enemy
		    - run like hell
		    - summon a tree
		    - kill all the enemies
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
hill giant

	// caster
????			// healer
rakshasa    	// evocatore (elementali)
vrock           // evocatore (dretch)
vampiro         // evocatore (progenie vamp)

	// healer
duergar 		// healer, sr

    // melee
progenie vampirica
dretch
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
golem roccia

	// custom
giant turtle    // fase invulnerabilita'
luci fatue		// fase inisibilita'
blink dog		// teleport


## LISTA LIVELLI

---------------------------------------
	* Campagna (1...3) : [ coboldi, goblin, orchi, troll ] 4/4

	* Deserto (2...4) : [ goblin, scheletri, troll, orchi, el.fuoco ] 5/6  mummie
		
	* Neve (3...5) : [ orchi, el.acqua, scheletro, gigante gelo ] 3/4  gnoll / girallon / lupo
		
	* Savana (4...6) : [ goblin, troll, el.terra, el.fuoco, minotauro, blink dog ] 4/6
		
	* Torre del mago (5...7) : [ tutti elementali, scheletri, golem argilla, golem ferro, dragonkind ] 5/8
	
	* Vulcano (6...8) : [ coboldi, orchi, el.fuoco, el.terra, el.aria, dragonkind ] 5/6
	
	* Cimitero (7...9) : [ zombi, scheletri, ghoul, mummie, minotauro, spettri ] 1/6

## BOSS	

Per il momento i boss saranno dei semplici npc con un sacco di vita e una ai un po' particolare
POI se avro' voglia li implementero' diversamente

    * Folletto : Avarizia ( verde )
	    cieca sete di ricchezza, scarsa disponibilità a spendere e a donare ciò che si possiede
	    - Campagna	    
    	    5 coboldi
    		5 coboldi 3 goblin
    		3 coboldi
    		3 coboldi 2 goblin 1 orco
    		3 coboldi 3 goblin 3 orchi
    		1 troll
    		2 orchi
    		10 orchi 10 coboldi
    		10 goblin 10 coboldi
    		3 troll

	* Ogre : Accidia ( arancione )
        torpore malinconico, inerzia nel vivere e nel compiere opere di bene
		- Savana al tramonto
    		5 goblin
    		7 goblin 3 scheletri
    		10 scheletri
    		7 scheletri 2 troll
    		3 goblin
    		7 goblin 5 orchi 5 scheletri 1 troll
    		5 scheletri 3 orchi 2 troll 1 el.fuoco
    		3 el.fuoco 2 troll
    		10 el.fuoco
    		5 troll 5 goblin 5 scheletri 5 el.fuoco 

	* Vermone gigante : Gola ( giallo )
	    abbandono ed esagerazione nei piaceri della tavola
		- Deserto

	* Ninfa Druida : Lussuria ( azzurro )
		desiderio irrefrenabile del piacere sessuale fine a sé stesso
		- Neve	

	* Drago : Ira ( rosso )
		irrefrenabile desiderio di vendicare violentemente un torto subito
		- Tana del drago / Vulcano in eruzione, magma e roccia bruciata

	* Golem di Argilla : Superbia ( blu )
		desiderio irrefrenabile di essere superiori, fino al disprezzo di ordini, leggi, rispetto altrui
		- Torre del mago / Librerie, corridoi, terrazza

	* Demi-Lich : Invidia ( viola )
		tristezza per il bene altrui, percepito come male proprio
		- Piano Astrale / tutto assurdo e fuori dal tempo
		- Cimitero di notte
		faccio uno schizzo per entrambi e vedo quale mi convince di piu'
		

## BUGS

* alcuni nemici sembrano in grado di attaccare anche da subito
    non ho piu' visto questo bug in azione, per cui se continua cosi' lo cancello