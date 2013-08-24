# [ AOQTD Tap Game ] (http://www.simone-poggi.com/)

L'obiettivo e' creare un gioco tipo archmage defense in cui il giocatore e' attaccato da orde di nemici 
piu' o meno forti che avanzano verso di lui, su cui si sparano incantesimi per difendersi

## TODO
    
Fare tutti i livelli
Fare tutti i mostri
cercare di capire come potrei implementare intelligenza artificiale dei mostri

( GRAPHICS )

    * completare i buff che accelerano o rallentano
	* Sprite dell'albero danneggiato in 3-4 fasi
	* mostri
	* livelli
		Piano astrale
	* gold / banner
	* Suoni / Musica

( CODE )

    * sistemare definitivamente UI, nemici, difficolta'
    * rivedere ai() dei nemici
    	* provare i nemici intelligenti/ranged
	* filmatino introduttivo
	* classi di mostro (humanoid, undead, beast, construct)
		hanno effetto sui dv, danni
	* implementare il boss fight
		comportamenti scriptati, con strategia da ripetere tre volte, stile vecchi giochi	

( Animazione iniziale )
	
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

( DOPO )

	* documentare il codice
	* pensare ad un modello con cui specializzi il protagonista o compri oggetti
	* rifare main.js per rispecchiare lo schema di sumon
	* html5 games prime, leggere ( http://buildnewgames.com/mobile-game-primer/ )


## LISTA MOSTRI
fatti
---------------------------------------
coboldo
orco
elementale acqua
elementale terra
elementale fuoco
elementale aria
troll

da fare
---------------------------------------
    //questi hanno attacchi ranged
goblin
drow        // sr, arciere
duergar     // sr
scheletro
rakshasa    // caster
hill giant  

    // questi hanno ai standard
dretch
zombie
melma
ghoul
ogre
mummia
progenie vampirica
minotauro
vrock           //resisevoca 1d10 dretch

golem argilla
golem ferro
golem roccia

giant turtle    //questi hanno una fase invulnerabilita'/teleport
vampiro         //caster
spettro
luci fatue
blink dog
bulette
shadow

## LISTA LIVELLI
							bg			music
---------------------------------------
	* Campagna				ok
	* Deserto				ok
	* Neve					ok
	* (arancione)			
	* Torre del mago		ok
	* Vulcano				ok
	* Piano Astrale			

## BOSS	

Per il momento i boss saranno dei semplici npc con un sacco di vita e una ai un po' particolare
POI se avro' voglia li implementero' diversamente


    * Folletto : Avarizia ( verde )
	    cieca sete di ricchezza, scarsa disponibilità a spendere e a donare ciò che si possiede
	    - Campagna

	* Ogre : Accidia ( arancione )
        torpore malinconico, inerzia nel vivere e nel compiere opere di bene
		- Savana al tramonto

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

* capire perche' a volte i nemici saltano addosso al giocatore
    perche' quando sono vicini eseguono una move, ma qualcosa sballa nel calcolo del tempo da impiegare
* alcuni nemici sembrano in grado di attaccare anche da subito
* alcuni nemici camminano in eterno
    mirano troppo in basso e quando arrivano non sono a portata del player, va rivista ai
* su android non mi mostra il font custom