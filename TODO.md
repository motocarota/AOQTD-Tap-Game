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
	* gold / banner
	* Suoni / Musica
	* rivedere il game over, sia win che die
	* animazione iniziale
		sd2 che spiega il suo piano e viene deriso

( CODE )

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
	* Palla di Fuoco (ok)
	* Fulmine (rifare sprite)
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
	* (arancione)		
	* Torre del mago		
	* Vulcano				
	* Piano Astrale			

## BOSS	

qui ci vorrebbe qualcosa di notoriamente avido
tipo un folletto o un genovese
una figura vecchia e avara tipo pdp

	* Tre Avventurieri : Avarizia ( verde )
		scarsa disponibilità a spendere e a donare ciò che si possiede, cieca sete di ricchezza
		- Campagna, colline e pianure irlandesi

	* Vermone gigante : Gola ( giallo )
		abbandono ed esagerazione nei piaceri della tavola
		- Deserto

	* Ogre : Accidia ( arancione )
		torpore malinconico, inerzia nel vivere e nel compiere opere di bene
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
		- Cimitero di notte



		

## BUGS

* impostare lo z-index dei nemici = director.height - y
* alcuni nemici sembrano in grado di attaccare anche da subito
* alcuni nemici camminano in eterno
* su android non mi mostra il font custom