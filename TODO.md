# [ AOQTD Tap Game ] (http://www.simone-poggi.com/)

L'obiettivo e' creare un gioco tipo archmage defense in cui il giocatore e' attaccato da orde di nemici 
piu' o meno forti che avanzano verso di lui, su cui si sparano incantesimi per difendersi

## TODO

( GRAPHICS )

	* mostri
	* spell
		rivedere lo sprite del fulmine, farlo piu' lungo (alto almeno 900px)
	* livelli
		Cava del drago
		Torre del mago
		Piano astrale
		
	* xp / gold / banner
	* Suoni / Musica
	* rivedere il game over, sia win che die
	* animazione iniziale
		sd2 che spiega il suo piano e viene deriso

( CODE )

	* Timer che genera i nemici in base al livello di gioco
		wave = [
			{ time: null, n:2,  type:[ 'fey' ] }, 				// dopo random sec evoca 2 fey
			{ time:  120, n:12, type:[ 'kobold', 'duck' ] }, 	// dopo 120 sec evoca 12 nemici tra koboldi e duck
			{ time:  240, n:1,  type:[ 'dragon' ] }				// dopo 240 sec evoca un drago
		];
	* implementare gli effetti over time
	* classi di mostro (humanoid, undead, beast, construct)
		hanno effetto sui dv, danni
	* implementare il boss fight
		comportamenti scriptati, con strategia da ripetere tre volte, stile vecchi giochi
	

( DOPO )

	* documentare il codice
	* rifare main.js per rispecchiare lo schema di sumon
	* html5 games prime, leggere ( http://buildnewgames.com/mobile-game-primer/ )


## INCANTESIMI

	* Dardo Incantato (ok)
	* Freccia Acida (implementare dot)
	* Palla di Fuoco (capovolgere esplosione)
	* ????
	* Orrido avvizzimento
	

## LISTA MOSTRI

con implementazione
					stand	walk	att		stun	data
---------------------------------------------------------------- livello 1
Kobold				ok		ok		ok				ok
Goblin
Orco				ok		ok		ok
Troll				ok		ok		ok

zombie
scheletro
ghoul
mummia
vampiro
ombra

cubo gelatinoso
rakshaaza
hill giant
golem
dragon
giant turtle
beholder
blink dog
shadow
minotauro
luci fatue

## LISTA LIVELLI
							bg			music
----
	* Campagna				ok
	* Deserto				ok
	* Neve			
	* 		
	* Torre del mago		
	* Vulcano				
	* Piano Astrale			

## BOSS	


	* Ogre : Accidia ( verde )
		torpore malinconico, inerzia nel vivere e nel compiere opere di bene
		- Campagna, colline e pianure irlandesi

	* Vermone gigante : Gola ( giallo )
		abbandono ed esagerazione nei piaceri della tavola
		- Deserto
	
	* ???? : Avarizia ( arancione )
		scarsa disponibilità a spendere e a donare ciò che si possiede, cieca sete di ricchezza
		- tramonto
	
	* Ninfa Druida : Lussuria ( azzurro )
		desiderio irrefrenabile del piacere sessuale fine a sé stesso
		- Neve	

	* Drago (fuoco) : Ira ( rosso )
		irrefrenabile desiderio di vendicare violentemente un torto subito
		- Tana del drago / Vulcano in eruzione, magma e roccia bruciata

	* Golem di Argilla : Superbia ( blu )
		desiderio irrefrenabile di essere superiori, fino al disprezzo di ordini, leggi, rispetto altrui
		- Torre del mago / Librerie, corridoi, terrazza

	* Demi-Lich : Invidia ( viola )
		tristezza per il bene altrui, percepito come male proprio
		- Piano Astrale / tutto assurdo e fuori dal tempo



		

## BUGS

* impostare lo z-index dei nemici = director.height - y
* alcuni nemici sembrano in grado di attaccare anche da subito
* alcuni nemici camminano in eterno
* su android non mi mostra il font custom