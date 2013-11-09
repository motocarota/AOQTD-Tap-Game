# [ AOQTD Tap Game ] (http://www.simone-poggi.com/)

L'obiettivo e' creare un gioco tipo archmage defense in cui il giocatore e' attaccato da orde di nemici 
piu' o meno forti che avanzano verso di lui, su cui si sparano incantesimi per difendersi

## TODO

( GRAPHICS )

	* mostri rimanenti
	* Rifare livelli 3(bosco/foresta tramonto) e 7(cimitero notturno)
	* Sprite dell'albero per ogni livello
		1,3: albero
		2: cactus
		4,7: albero secco
		5: albero evocato
		6: stalagmite
	* Sprite dell'albero danneggiato in 3-4 fasi
	* screen iniziale:
		rifare il logo piu' grosso
		dare una passata di bianco trasparente ai nemici
		ricolorare il goblin
		rivedere anche il duergar

( CODE )

	* aggiungere i fg per gli sfondi
	* inserire Suoni e Musica
		// director.audioPlay( 'boom' );
	* creare la funzione "stampEffect" per scritta "you win", "level up" e i px
	
( DOPO )

	* livello nascosto survival mode con sempre piu' mucche
	* pensare ad un modello con cui specializzi il protagonista o compri oggetti
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
????			// healer
rakshasa    	// evocatore (elementali) HARD

necromancer		// evocatore (dretch) EASY
vampiro			// evocatore (progenie vamp) MEDIUM

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

Rivista lista dei nemici, classificandoli per tipo

			Easy			Medium			Hard			Boss
-----------------------------------------------------------------
Melee		coboldo			orco			troll			
			elem			scheletro		golem
			dretch			zombie			minotauro
Ranged		goblin			drow			giant			
Caster		imp				dragonkind		rakshaaza		
Healer		duergar			-				-				
Summoner	vrock			vampiro			-				


## LISTA LIVELLI

--------------------------------------------------------------------
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
	    - Add droppano monetine: lui torna indietro a raccoglierle

	* Ogre : Accidia ( arancione )
        torpore malinconico, inerzia nel vivere e nel compiere opere di bene
		- caster
		- quando viene colpito si sposta
		- 

	* Vermone gigante : Gola ( giallo )
	    abbandono ed esagerazione nei piaceri della tavola
		- 

	* Ninfa Druida : Lussuria ( azzurro )
		desiderio irrefrenabile del piacere sessuale fine a sé stesso
		- curatrice
		- evocatrice
		- ranged (cuoricini, tolgono vita e danno mana)

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
