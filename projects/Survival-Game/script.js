const storyText = document.getElementById('story-text');
const üschrift = document.getElementById('üschrift');
const optionsContainer = document.getElementById('options-container');
const storySummaryDiv = document.getElementById('story-summary');
const resetButton = document.createElement('button');
const verweis = document.getElementById('verweis');
let selectedChoices = [];

let story = {
    start: {
        text: "Du wachst auf und bemerkst, dass das morgendliche Licht ausbleibt. Ein dröhnendes Geräusch von draußen weckt dich – es klingt wie Explosionen. Die Welt hat sich verändert. Es ist 5:00 Uhr. Du bist müde, aber du musst jetzt entscheiden, wie du überlebst.",
        options: [
            { text: "Ich bleibe im Bett und ignoriere das Chaos.", next: "option1" },
            { text: "Ich stehe auf und schaue nach, was draußen los ist.", next: "option2" }
        ],
        suboptions: {
            option1: {
                text: "Nach einigen Stunden hörst du plötzlich Schüsse und Schreie aus der Nachbarschaft.",
                options: [
                    { text: "Rausgehen", next: "option1_1" },
                    { text: "Verstecken", next: "option1_2" }
                ],
                suboptions: {
                    option1_1: {
                        text: "Du gehst nach draußen und siehst Horden von Zombies, die das Gebiet überrennen.",
                        options: [
                            { text: "Ich nehme mein Auto und versuche, zu fliehen.", next: "option1_1_1" },
                            { text: "Ich renne zu Fuß in den nahegelegenen Wald.", next: "option1_1_2" }
                        ],
                        suboptions: {
                            option1_1_1: {
                                text: "Du fährst mit dem Auto, aber die Straßen sind blockiert. Zombies umzingeln das Fahrzeug.",
                                options: [
                                    { text: "Ich versuche, das Auto durch die Zombie-Horde zu manövrieren.", next: "option1_1_1_1" },
                                    { text: "Ich verlasse das Auto und versuche zu fliehen.", next: "option1_1_1_2" }
                                ],
                                suboptions: {
                                    option1_1_1_1: {
                                        text: "Die Horde wird immer dichter und dein Auto kommt fast zum stehen",
                                        options: [
                                            { text: "Umdrehen", next: "option1_1_1_1_1"},
                                            { text: "Gas geben", next: "option1_1_1_1_2"}
                                        ],
                                        suboptions: {
                                            option1_1_1_1_1: {
                                                text: "Als du umdrehst bemerkst du das die Horde schneller wird",
                                                option: [
                                                    { text: ""},
                                                    { text: ""}
                                                ],
                                                suboptions: {}
                                            },
                                            option1_1_1_1_2: {
                                                text: "Du gibst vollgas aber hast fährst gegen ein anderes Auto",
                                                options: [],
                                                suboptions: {}
                                            }
                                        }
                                    },
                                    option1_1_1_2: {
                                        text: "Du verlässt das Auto und versuchst zu fliehen. Du schaffst es in den Wald und entkommst vorerst. Aber die Gefahr bleibt. Du hast überlebt, aber was jetzt?",
                                        options: [
                                            { text: "Ich baue ein Lager im Wald auf.", next: "option1_1_1_2_1" },
                                            { text: "Ich suche nach einem verlassenen Haus.", next: "option1_1_1_2_2" }
                                        ],
                                        suboptions: {
                                            option1_1_1_2_1: {
                                                text: "Du baust ein Lager auf und bist für den Moment sicher. Doch in der Nacht hörst du Zombies in der Nähe.",
                                                options: [
                                                    { text: "Ich stelle Fallen auf, um sie abzuwehren.", next: "option1_1_1_2_1_1" },
                                                    { text: "Ich fliehe weiter.", next: "option1_1_1_2_1_2" }
                                                ],
                                                suboptions: {
                                                    option1_1_1_2_1_1: {
                                                        text: "Die Fallen fangen einige Zombies und du kannst vorerst sicher weiterleben. Doch du weißt, dass du irgendwann wieder fliehen musst.",
                                                        options: [
                                                            { text: "Ich versuche, in eine andere Stadt zu fliehen.", next: "option1_1_1_2_1_1_1" },
                                                            { text: "Ich baue das Lager weiter aus.", next: "option1_1_1_2_1_1_2" }
                                                        ],
                                                        suboptions: {
                                                            option1_1_1_2_1_1_1: {
                                                                text: "Du fliehst in eine andere Stadt, aber auch dort sind Zombies. Doch du findest eine Gruppe von Überlebenden.",
                                                                options: [
                                                                    { text: "Ich schließe mich der Gruppe an und bleibe bei ihnen.", next: "option1_1_1_2_1_1_1_1" },
                                                                    { text: "Ich gründe meine eigene Gruppe und verlasse die Überlebenden.", next: "option1_1_1_2_1_1_1_2" }
                                                                ],
                                                                suboptions: {
                                                                    option1_1_1_2_1_1_1_1: {
                                                                        text: "Du schließt dich der Gruppe an und hilfst dabei, das Überleben zu sichern. Ihr baut ein Lager, teilt Ressourcen und verteidigt euch gemeinsam gegen die Zombies. Schließlich findet ihr einen sicheren Ort und eine neue Heimat.",
                                                                        options: [
                                                                            { text: "Ich helfe, das Lager weiter auszubauen.", next: "option1_1_1_2_1_1_1_1_1" },
                                                                            { text: "Ich versuche, zu den anderen Städten zu reisen, um mehr Vorräte zu finden.", next: "option1_1_1_2_1_1_1_1_2" }
                                                                        ],
                                                                        suboptions: {
                                                                            option1_1_1_2_1_1_1_1_1: {
                                                                                text: "Du hilfst eifrig beim Ausbau des Lagers, während du langsam Freunde findest. Du lernst Sarah kennen, eine starke Frau, die früher eine Krankenschwester war. Sie zeigt dir, wie man mit begrenzten Ressourcen behandelt. Doch dann, eines Nachts, wird das Lager von einer Horde Zombies überrannt. Sarah wird dabei getötet. Du bist am Boden zerstört.",
                                                                                options: [
                                                                                    { text: "Ich schwöre Rache und kämpfe weiter.", next: "option1_1_1_2_1_1_1_1_1_1" },
                                                                                    { text: "Ich verliere die Hoffnung und denke darüber nach, das Lager zu verlassen.", next: "option1_1_1_2_1_1_1_1_1_2" }
                                                                                ],
                                                                                suboptions: {
                                                                                    option1_1_1_2_1_1_1_1_1_1: {
                                                                                        text: "Du kämpfst verbittert weiter, zusammen mit den anderen Überlebenden. Der Verlust von Sarah hat dich gehärtet, und du schwörst, dass die Zombies für alles bezahlen werden. Doch auch viele andere deiner Freunde sterben. Du bist jetzt allein, aber du hast dir geschworen, weiter zu kämpfen. Eines Tages legst du dich mit zu vielen Zombies an und wirst gefressen. ---- Du bist gestorben! "
                                                                                    },
                                                                                    option1_1_1_2_1_1_1_1_1_2: {
                                                                                        text: "Du verlässt das Lager und begibst dich in die gefährliche Welt der Zombiekontamination. Du triffst auf andere Überlebende, aber das Leben wird nie wieder so wie vorher sein. Viele deiner Freunde sterben auf diesem Weg. Du bist allein, doch auf einmal Trifft du auf eine Millitärische Zivilisation die eine neue Welt aufbauen wollten ---- Du hast überlebt"
                                                                                    }
                                                                                }
                                                                            },
                                                                            option1_1_1_2_1_1_1_1_2: {
                                                                                text: "Du machst dich auf den Weg zu den anderen Städten, aber die Reise ist gefährlich. Du musst durch verlassene Gebirgspfade und städtische Ruinen reisen. Auf dem Weg triffst du auf einen Mann namens Mark, der dich vor einer Horde Zombies rettet. Ihr teilt Ressourcen und Erfahrungen. Ihr entwickelt eine enge Freundschaft.",
                                                                                options: [
                                                                                    { text: "Ich reise weiter mit Mark und finde eine neue Zuflucht.", next: "option1_1_1_2_1_1_1_1_2_1" },
                                                                                    { text: "Ich überlege, mich von Mark zu trennen und auf eigene Faust weiterzugehen.", next: "option1_1_1_2_1_1_1_1_2_2" }
                                                                                ],
                                                                                suboptions: {
                                                                                    option1_1_1_2_1_1_1_1_2_1: {
                                                                                        text: "Du und Mark finden schließlich einen abgelegenen, aber sicheren Ort in den Wäldern, wo ihr eine kleine Gemeinschaft mit anderen Überlebenden aufbaut. Doch der Frieden ist zerbrechlich. Nach einigen Wochen wird Mark von einer Zombie-Horde erwischt und stirbt. Dein Herz bricht erneut. Aber du bleibst stark und führst die Gruppe weiter.",
                                                                                        options: [
                                                                                            { text: "Ich bleibe und führe die Gruppe an.", next: "option1_1_1_2_1_1_1_1_2_1_1" },
                                                                                            { text: "Ich verlasse die Gruppe und gehe alleine weiter.", next: "option1_1_1_2_1_1_1_1_2_1_2" }
                                                                                        ],
                                                                                        suboptions: {
                                                                                            option1_1_1_2_1_1_1_1_2_1_1: {
                                                                                                text: "Du führst die Gruppe und sorgst dafür, dass sie überlebt. Es gibt immer wieder Verluste, aber du wirst stärker und versuchst, die nächste Generation von Überlebenden zu leiten. Doch auch du weißt, dass der Frieden nur vorübergehend ist. Eines Tages wird euer Lager von einer Horde von Zombies überrant. ---- Du bist gestorben!"
                                                                                            },
                                                                                            option1_1_1_2_1_1_1_1_2_1_2: {
                                                                                                text: "Du verlässt die Gruppe und gehst alleine weiter. Du findest ein verlassenes Krankenhaus und versuchst, medizinische Vorräte zu sammeln. Aber es gibt nichts, was dich für immer vor den Zombies schützen kann. Du bist auf dich allein gestellt. Als du aus dem Krankenhaus rausgelaufen bist griff dich ein Zombie von hinten an, du wurdest in den Nacken gebissen. ---- Du bist gestorben!"
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    option1_1_1_2_1_1_1_1_2_2: {
                                                                                        text: "Du trennst dich von Mark und setzt deine Reise allein fort. Doch du erfährst bald, dass das Leben in der post-apokalyptischen Welt noch schwieriger wird, wenn man alleine ist. Du kämpfst gegen Zombies, hungrige Überlebende und die elementaren Gefahren der Welt. Nach vielen Rückschlägen findest du einen sicheren Ort, aber auch dort gibt es keine Garantie für Sicherheit. In der Nacht kommt ein Zombie in dein Schlaflager und fängt an dich zu fressen. ---- Du bist gestorben!"
                                                                                    },
                                                                                }
                                                                            }
                                                                        }
                                                                    },
                                                                    option1_1_1_2_1_1_1_2: {
                                                                        text: "Du gründest deine eigene Gruppe. Anfangs läuft alles gut. Du findest einige Überlebende, darunter eine Frau namens Emma, die ein Naturtalent in der Jagd hat. Doch je länger du mit der Gruppe lebst, desto mehr bricht das Chaos aus. Ressourcen werden knapp, und die Zombies rücken immer näher.",
                                                                        options: [
                                                                            { text: "Ich versuche, das Lager weiter zu verteidigen und hoffe, dass Hilfe kommt.", next: "option1_1_1_2_1_1_1_2_1" },
                                                                            { text: "Ich entschließe mich, das Lager zu verlassen und in eine größere Stadt zu reisen.", next: "option1_1_1_2_1_1_1_2_2" }
                                                                        ],
                                                                        suboptions: {
                                                                            option1_1_1_2_1_1_1_2_1: {
                                                                                text: "Du versuchst das Lager zu verteidigen, aber es sind zu viele Zombies. Viele deiner Freunde, auch Emma, sterben. Du hältst nicht mehr lange durch und fällst erschöpft in die Horde. ---- Du bist gestorben!",
                                                                                options: [
                                                                                    { text: "Ich kämpfe weiter, hoffe auf Hilfe.", next: "option1_1_1_2_1_1_1_2_1_1" },
                                                                                    { text: "Ich gebe nicht auf, bis zum letzten Atemzug.", next: "option1_1_1_2_1_1_1_2_1_2" },
                                                                                    { text: "Ich versuche zu fliehen, aber es ist zu spät.", next: "option1_1_1_2_1_1_1_2_1_3" }
                                                                                ],
                                                                                suboptions: {
                                                                                    option1_1_1_2_1_1_1_2_1_1: {
                                                                                        text: "Der Kampf ist zu viel, du fällst erschöpft in die Horde. ---- Du bist gestorben!"
                                                                                    },
                                                                                    option1_1_1_2_1_1_1_2_1_2: {
                                                                                        text: "Du kämpfst bis zum Ende, doch schließlich fällst du in die Horde. ---- Du bist gestorben!"
                                                                                    },
                                                                                    option1_1_1_2_1_1_1_2_1_3: {
                                                                                        text: "Die Flucht misslingt, du fällst in die Horde. ---- Du bist gestorben!"
                                                                                    }
                                                                                }
                                                                            },                                                                            
                                                                            option1_1_1_2_1_1_1_2_2: {
                                                                                text: "Du reist in die Stadt, du kämpfst weiter, immer auf der Flucht. Viele deiner Freunde sterben auf dem Weg. Du findest eine neue Gruppe von Überlebenden.",
                                                                                options: [
                                                                                    { text: "Gruppe Anschließen", next: "option1_1_1_2_1_1_1_2_2_1"},
                                                                                    { text: "Alleine Weiterziehen", next: "option1_1_1_2_1_1_1_2_2_2"}
                                                                                ],
                                                                                suboptions: {
                                                                                    option1_1_1_2_1_1_1_2_2_1: {
                                                                                        text: "Ihr habt von Vorräten in einer Höhle gehört",
                                                                                        options: [
                                                                                            { text: "Gehen wir in die Höhle", next: "option1_1_1_2_1_1_1_2_2_1_1"},
                                                                                            { text: "Nicht in die Höhle gehen", next: "option1_1_1_2_1_1_1_2_2_1_2"}
                                                                                        ],
                                                                                        suboptions: {
                                                                                            option1_1_1_2_1_1_1_2_2_1_1: {
                                                                                                text: "Die Höhle war nichtmehr Stabil und Stürzte ein. ---- Ihr seid alle gestorben!"
                                                                                            },
                                                                                            option1_1_1_2_1_1_1_2_2_1_2: {
                                                                                                text: "Ihr wart in der Stadt um Vorräte zu sammeln und wurdet von einer Horde Zombies überrant. ---- Ihr seid gestorben!"
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    option1_1_1_2_1_1_1_2_2_2: {
                                                                                        text: "Du ziehst alleine durch die Stadt und wirst von Zombies überrant ---- Du bist gestorben!"
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            },                                                        
                                                            option1_1_1_2_1_1_2: {
                                                                text: "Du baust das Lager weiter aus, aber die Ressourcen gehen zur Neige. Du bist in einer Zwickmühle. ---- Game Over"
                                                            }
                                                        }
                                                    },
                                                    option1_1_1_2_1_2: {
                                                        text: "Du fliehst weiter, doch die Zombies holen dich ein. ---- Game Over"
                                                    }
                                                }
                                            },
                                            option1_1_1_2_2: {
                                                text: "Du findest ein verlassenes Haus, aber es ist voll mit Zombies. Du kämpfst tapfer, aber du wirst von den Zombies überwältigt. ---- Game Over"
                                            }
                                        }
                                    }
                                }
                            },
                            option1_1_2: {
                                text: "Du läufst in den Wald, aber die Zombies sind dir dicht auf den Fersen. Du stolperst und verletzt dich.",
                                options: [
                                    { text: "Ich kämpfe gegen die Zombies mit allem, was ich habe.", next: "option1_1_2_1" },
                                    { text: "Ich versuche, mich weiter zu verstecken und hoffe auf Rettung.", next: "option1_1_2_2" }
                                ],
                                suboptions: {
                                    option1_1_2_1: {
                                        text: "Du kämpfst tapfer, aber es ist zu viel. Du wirst von den Zombies überwältigt. ---- Game Over"
                                    },
                                    option1_1_2_2: {
                                        text: "Du findest ein verlassenes Haus und versteckst dich, während die Zombies weiterziehen. Du hast überlebt, aber der Kampf geht weiter.",
                                        options: [
                                            { text: "Ich sammle Vorräte aus dem Haus.", next: "option1_1_2_2_1" },
                                            { text: "Ich gehe weiter auf der Flucht.", next: "option1_1_2_2_2" }
                                        ],
                                        suboptions: {
                                            option1_1_2_2_1: {
                                                text: "Du sammelst Vorräte und machst dich auf, weiterzuziehen. Doch die Zombies haben die Gegend umstellt.",
                                                options: [
                                                    { text: "Ich kämpfe, um zu entkommen.", next: "option1_1_2_2_1_1" },
                                                    { text: "Ich gehe durch die Kanalisation.", next: "option1_1_2_2_1_2" }
                                                ],
                                                suboptions: {
                                                    option1_1_2_2_1_1: {
                                                        text: "Du kämpfst tapfer, schaffst es jedoch nicht zu entkommen. ---- Game Over"
                                                    },
                                                    option1_1_2_2_1_2: {
                                                        text: "Du gehst durch die Kanalisation und entkommst den Zombies. Doch die Stadt ist verloren. ---- Gewonnen"
                                                    }
                                                }
                                            },
                                            option1_1_2_2_2: {
                                                text: "Du fliehst weiter, aber die Zombies sind schneller als du. Du wirst eingeholt. ---- Game Over"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    option1_2: {
                        text: "Du gehst nach draußen und siehst die Stadt in völliger Zerstörung. Zombies treiben sich überall herum. Du musst schnell entscheiden, was du tust.",
                        options: [
                            { text: "Ich gehe in die nächste Straße, um Hilfe zu finden.", next: "option1_2_1" },
                            { text: "Ich gehe in den nahegelegenen Wald, um mich zu verstecken.", next: "option1_2_2" }
                        ],
                        suboptions: {
                            option1_2_1: {
                                text: "Du gehst in die Straße, aber sie ist völlig verlassen. Plötzlich hörst du das Knurren von Zombies.",
                                options: [
                                    { text: "Ich nehme einen nahen Bunker als Zuflucht.", next: "option1_2_1_1" },
                                    { text: "Ich renne zurück in das Gebäude und versuche, mich zu verstecken.", next: "option1_2_1_2" }
                                ],
                                suboptions: {
                                    option1_2_1_1: {
                                        text: "Du kämpfst tapfer, schaffst es jedoch nicht zu entkommen. ---- Game Over"
                                    },
                                    option1_2_1_2: {
                                        text: "Du gehst zurück in das Gebäude und versuchst, dich zu verstecken. Du hast überlebt, aber der Kampf geht weiter.",
                                        options: [
                                            { text: "Ich sammle Vorräte aus einem Bunker.", next: "option1_2_1_2_1" },
                                            { text: "Ich gehe weiter auf die Flucht.", next: "option1_2_1_2_2" }
                                        ],
                                        suboptions: {
                                            option1_2_1_2_1: {
                                                text: "Du sammelst Vorräte und machst dich auf, weiterzuziehen. Doch die Zombies haben die Gegend umstellt.",
                                                options: [
                                                    { text: "Ich kämpfe, um zu entkommen.", next: "option1_2_1_2_1_1" },
                                                    { text: "Ich gehe durch die Kanalisation.", next: "option1_2_1_2_1_2" }
                                                ],
                                                suboptions: {
                                                    option1_2_1_2_1_1: {
                                                        text: "Du kämpfst tapfer, schaffst es jedoch nicht zu entkommen. ---- Game Over"
                                                    },
                                                    option1_2_1_2_1_2: {
                                                        text: "Du gehst durch die Kanalisation und entkommst den Zombies."
                                                    }
                                                }
                                            },
                                            option1_2_1_2_2: {
                                                 text: "Du fliehst weiter, aber die Zombies sind schneller als du. Du wirst eingeholt. ---- Game Over"
                                            }
                                        }
                                    }
                                }
                            },
                            option1_2_2: {
                                text: "Du gehst in den Wald, aber die Zombies sind dir dicht auf den Fersen. Du stolperst und verletzt dich.",
                                options: [
                                    { text: "Ich kämpfe gegen die Zombies mit allem, was ich habe.", next: "option1_2_2_1" },
                                    { text: "Ich versuche, mich weiter zu verstecken und hoffe auf Rettung.", next: "option1_2_2_2" }
                                ],
                                suboptions: {
                                    option1_2_2_1: {
                                        text: "Du kämpfst tapfer, aber es ist zu viel. Du wirst von den Zombies überwältigt. ---- Game Over"
                                    },
                                    option1_2_2_2: {
                                        text: "Du fliehst weiter, aber die Zombies sind schneller als du. Du wirst eingeholt. ---- Game Over"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            option2: {
                text: "Du gehst vorsichtig nach draußen und siehst die Stadt in völliger Zerstörung. Zombies treiben sich überall herum. Du musst schnell entscheiden, was du tust.",
                options: [
                    { text: "Ich gehe in die nächste Straße, um Hilfe zu finden.", next: "option2_1" },
                    { text: "Ich gehe in den nahegelegenen Wald, um mich zu verstecken.", next: "option2_2" }
                ],
                suboptions: {
                    option2_1: {
                        text: "Du gehst in die Straße, aber sie ist völlig verlassen. Plötzlich hörst du das Knurren von Zombies.",
                        options: [
                            { text: "Ich nehme einen nahen Bunker als Zuflucht.", next: "option2_1_1" },
                            { text: "Ich renne zurück in das Gebäude und versuche, mich zu verstecken.", next: "option2_1_2" }
                        ],
                        suboptions: {
                            option2_1_1: {
                                text: "Der Bunker ist sicher, aber du hörst Geräusche von Zombies draußen. Du musst langfristig überlegen, wie du überlebst.",
                                options: [
                                    { text: "Ich versuche, nach anderen Überlebenden zu suchen.", next: "option2_1_1_1" },
                                    { text: "Ich baue den Bunker aus und halte Wache.", next: "option2_1_1_2" }
                                ],
                                suboptions: {
                                    option2_1_1_1: {
                                        text: "Du siehst aus der Ferne eine Gruppe von Überlebenden",
                                        options: [
                                            { text: "Ich laufe schnell hin", next: "option2_1_1_1_1"},
                                            { text: "Ich halte mich lieber fern", next: "option2_1_1_1_2"}
                                        ],
                                        suboptions: {
                                            option2_1_1_1_1: {
                                                text: "Die überlebenden erschrecken sich und denken du wärst ein Zombie. ---- Du wurdest erschossen"
                                            },
                                            option2_1_1_1_2: {
                                                text: "Die Überlebenden habe dich gesehen und laufen dir hinterher",
                                                options: [
                                                    { text: "Ich renne schnell zum Bunker", next:"option2_1_1_1_2_1"},
                                                    { text: "Ich warte auf sie", next: "option2_1_1_1_2_2"}
                                                ],
                                                suboptions: {
                                                    option2_1_1_1_2_1: {
                                                        text: "Als du im Bunker ankommst hörst du außen an der Tür die Überlebenden wie sie versuchen die Tür aufzubrechen",
                                                        options: [
                                                            { text: "Tür aufmachen", next: "option2_1_1_1_2_1_1"},
                                                            { text: "Tür zulassen", next: "option2_1_1_1_2_1_2"}
                                                        ],
                                                        suboptions: {
                                                            option2_1_1_1_2_1_1: {
                                                                text: "Du machst die Tür auf und die Überlebenden töten dich. ---- Du wurdest getötet"
                                                            },
                                                            option2_1_1_1_2_1_2: {
                                                                text: "Du lässt die TÜr zu aber verhungerst. ---- Du bist verhungert"
                                                            }
                                                        }
                                                    },
                                                    option2_1_1_1_2_2: {
                                                        text: "Die Überlebenden haben dich ausgeraubt",
                                                        options: [
                                                            { text: "Ich räche mich", next: "option2_1_1_1_2_2_1"},
                                                            { text: "Ich laufe weg", next: "option2_1_1_1_2_2_2"}
                                                        ],
                                                        suboptions: {
                                                            option2_1_1_1_2_2_1: {
                                                                text: "Du versuchst dich zu rächen aber schaffst es nur 2 Leute zu erledigen ---- Du wurdest erschossen"
                                                            },
                                                            option2_1_1_1_2_2_2: {
                                                                text: "Dir wurde in den Rücken geschossen ---- Du wurdest erschossen"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    option2_1_1_2: {
                                        text: "Du baust den Bunker aus, aber die Nahrung wird knapp.",
                                        options: [
                                            { text: "Im Bunker bleiben", next: "option2_1_1_2_1"},
                                            { text: "Nach draußen gehen", next: "option2_1_1_2_2"}
                                        ],
                                        suboptions: {
                                            option2_1_1_2_1: {
                                                text: "Du bist verhungert weil dir die Nahrung ausgegangen ist ---- Du bist verhungert"
                                            },
                                            option2_1_1_2_2: {
                                                text: "Du stehst an deiner Bunkertür und hörst dahinter Zombies",
                                                options: [
                                                    { text: "Tür aufmachen", next: "option2_1_1_2_2_1"},
                                                    { text: "Im Bunker bleiben", next: "option2_1_1_2_2_2"},
                                                ],
                                                suboptions: {
                                                    option2_1_1_2_2_1: {
                                                        text: "Es waren 3 Zombies hinter der Tür die du erlegen konntest, nun gehts um die Nahrungssuche",
                                                        options: [
                                                            { text: "Tiere suchen", next: "option2_1_1_2_2_1_1"},
                                                            { text: "Häuser durchsuchen", next: "option2_1_1_2_2_1_2"}
                                                        ],
                                                        suboptions: {
                                                            option2_1_1_2_2_1_1: {
                                                                text: "Du hast ein Reh erlegt doch siehst dass es eine Infizierte verletzung hat.",
                                                                options: [
                                                                    { text: "Infiziertes Fleisch rausschneiden und Reh braten", next: "option2_1_1_2_2_1_1_1"},
                                                                    { text: "Reh liegen lassen", next: "option2_1_1_2_2_1_1_2"}
                                                                ],
                                                                suboptions: {
                                                                    option2_1_1_2_2_1_1_1: {
                                                                        text: "Das Fleisch was schon zu sehr Infiziert dass du nun auch Krank bist. ---- Du wurdest zum Zombie"
                                                                    },
                                                                    option2_1_1_2_2_1_1_2: {
                                                                        text: "Du schleichst Stundenlang durch den Wald auf der suche nach Tieren, doch vergebens. ---- Du bist verhungert"
                                                                    }
                                                                }
                                                            },
                                                            option2_1_1_2_2_1_2: {
                                                                text: "In den ersten beiden Häusern hast du essen gefunden, aber im 3 Haus wurdest du von Zombies überfallen. ---- Du wurdest gefressen"
                                                            }
                                                        }
                                                    },
                                                    option2_1_1_2_2_2: {
                                                        text: "Nach einer Zeit ist dir die Nahrung ausgegangen. ---- Du bist verhungert"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            option2_1_2: {
                                text: "Du rennst ins Gebäude, aber die Zombies verfolgen dich. Du wirst eingeholt. ---- Du wurdest gefressen"
                            }
                        }
                    },
                    option2_2: {
                        text: "Du fliehst in den Wald, aber auch dort gibt es Zombies",
                        options: [
                            { text: "Ich fange an zu kämpfen", next: "option2_2_1" },
                            { text: "Ich versuche zu fliehen", next: "option2_2_2" }
                        ],
                        suboptions: {
                            option2_2_1: {
                                text: "Ich fange an zu kämpfen, viele Zombies fallen um doch einer hat dich erwischt",
                                options: [
                                    { text: "Wunde desinfizieren", next: "option2_2_1_1" },
                                    { text: "Verband anlegem", next: "option2_2_1_2" }
                                ],
                                suboptions: {
                                    option2_2_1_1: {
                                        text: "Du hast eine Wunde desinfiziert",
                                        options: [
                                            { text: "Verband anlegen", next: "option2_2_1_1_1" },
                                            { text: "Weitergehen", next: "option2_2_1_1_2" }
                                        ],
                                        suboptions: {
                                            option2_2_1_1_1: {
                                                text: "Du hast einen Verband angelegt",
                                                options: [
                                                    { text: "Weitergehen", next: "option2_2_1_1_2_1" },
                                                    { text: "Ausruhen", next: "option2_2_1_1_2_2" }
                                                ],
                                                suboptions: {
                                                    option2_2_1_1_2_1: {
                                                        text: "Zombies folgen dir",
                                                        options: [
                                                            { text: "Ich laufe", next: "option2_2_1_1_2_1_1"},
                                                            { text: "Ich kämpfe", next: "option2_2_1_1_2_1_2"}
                                                        ],
                                                        suboptions: {
                                                            option2_2_1_1_2_1_1: {
                                                                text: "Du schaffst es vor den Zombies zu fliehen und findest eine Wohnsiedlung",
                                                                options: [
                                                                    { text: "Häuser durchsuchen", next: "option2_2_1_1_2_1_1_1"},
                                                                    { text: "Weitergehen", next: "option2_2_1_1_2_1_1_2"}
                                                                ],
                                                                suboptions: {
                                                                    option2_2_1_1_2_1_1_1: {
                                                                        text: "Beim Häuser durchsuchen siehst du Plünderer auf der Strecke.",
                                                                        options: [
                                                                            { text: "Verstecken", next: "option2_2_1_1_2_1_1_1_1"},
                                                                            { text: "Zu ihnen gehen", next: "option2_2_1_1_2_1_1_1_2"}
                                                                        ],
                                                                        suboptions: {
                                                                            option2_2_1_1_2_1_1_1_1: {
                                                                                text: "Die Plünderer haben dich nicht gesehen aber Ihnen folgt eine riesige Horde von Zombies",
                                                                                options: [
                                                                                    { text: "Weglaufen", next: "option2_2_1_1_2_1_1_1_1_1"},
                                                                                    { text: "Ich verstecke mich", next: "option2_2_1_1_2_1_1_1_1_2"}
                                                                                ],
                                                                                suboptions: {
                                                                                    option2_2_1_1_2_1_1_1_1_1: {
                                                                                        text: "Du versuchst wegzulaufen aber die Horde Kesselt dich ein. ---- Du wurdest gefressen",
                                                                                    },
                                                                                    option2_2_1_1_2_1_1_1_1_2: {
                                                                                        text: "Die Zombies haben dich bemerkt und eingekesselt. ---- Du wurdest gefressen",
                                                                                    }
                                                                                }
                                                                            },
                                                                            option2_2_1_1_2_1_1_1_2: {
                                                                                text: "Als du zu ihnen gegangen bist haben sie dich überfallen und erschossen. ---- Du wurdest erschossen",
                                                                            }
                                                                        }
                                                                    },
                                                                    option2_2_1_1_2_1_1_2: {
                                                                        text: "Beim weiterlaufen wirst du von Plünderern überfallen. ---- Du wurdest erschossen",
                                                                    }
                                                                }
                                                            },
                                                            option2_2_1_1_2_1_2: {
                                                                text: "Beim Kämpfen fällst du hin und die Zombies fallen über dich her ---- Du wurdest gefressen",
                                                            }
                                                        }
                                                    },
                                                    option2_2_1_1_2_2: {
                                                        text: "Während du dich Ausruhst hörst du ferne Geräusche: Zombie",
                                                        options: [
                                                            { text: "Ich renne", next: "option2_2_1_1_2_2_1"},
                                                            { text: "Ich kämpfe", next: "option2_2_1_1_2_2_2"}
                                                        ],
                                                        suboptions: {
                                                            option2_2_1_1_2_2_1: {
                                                                text: "Rennen überlastet deine Verletzung und die Zombies haben dich erwischt ---- Du wurdest gefressen",
                                                            },
                                                            option2_2_1_1_2_2_2: {
                                                                text: "Du wurdest unkonzentriert wegen deiner Verletzung und die Zombies haben dich erwischt ---- Du wurdest gefressen",
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            option2_2_1_1_2: {
                                                text: "In deine Wunde ist dreck gekommen und ist nun Entzündet",
                                                options: [
                                                    { text: "Wunde säubern", next: "option2_2_1_1_2_1" },
                                                    { text: "Nichts tun", next: "option2_2_1_1_2_2" }
                                                ],
                                                suboptions: {
                                                    option2_2_1_1_2_1: {
                                                        text: "Deine Wunde ist nun sauber aber immernoch Entzündet",
                                                        options: [
                                                            { text: "Krankenhaus suchen", next: "option2_2_1_1_2_1_1" },
                                                            { text: "Weitergehen", next: "option2_2_1_1_2_1_2" }
                                                        ],
                                                        suboptions: {
                                                            option2_2_1_1_2_1_1: {
                                                                text: "Nach einiger Zeit findest du ein Krankenhaus es sieht aber Instabil aus",
                                                                options: [
                                                                    { text: "Reingehen und Antibiotiker suchen", next: "option2_2_1_1_2_1_1_1" },
                                                                    { text: "Draussen suchen", next: "option2_2_1_1_2_1_1_2" }
                                                                ],
                                                                suboptions: {
                                                                    option2_2_1_1_2_1_1_1: {
                                                                        text: "Als du reingegangen bist fiel die Decke auf dich runter. ---- Du bist gestorben"
                                                                    },
                                                                    option2_2_1_1_2_1_1_2: {
                                                                        text: "Einige Zeit später bekommst du Schüttelfrost und Atemnot. ---- Du bist durch eine Blutvergiftung gestorben"
                                                                    }
                                                                }
                                                            },
                                                            option2_2_1_1_2_1_2: {
                                                                text: "Nach einer Weile merkst du dass du leichtes Fieber hast ",
                                                                options: [
                                                                    { text: "Krankenhaus suchen", next: "option2_2_1_1_2_1_2_1" },
                                                                    { text: "Weitergehen", next: "option2_2_1_1_2_1_2_2" }
                                                                ],
                                                                suboptions: {
                                                                    option2_2_1_1_2_1_2_1: {
                                                                        text: "Nach einiger Zeit findest du ein Krankenhaus es sieht aber Instabil aus",
                                                                        options: [
                                                                            { text: "Reingehen und Antibiotiker suchen", next: "option2_2_1_1_2_1_2_1_1" },
                                                                            { text: "Draussen suchen", next: "option2_2_1_1_2_1_2_1_2" }
                                                                        ],
                                                                        suboptions: {
                                                                            option2_2_1_1_2_1_2_1_1: {
                                                                                text: "Als du reingegangen bist fiel die Decke auf dich runter. ---- Du bist gestorben"
                                                                            },
                                                                            option2_2_1_1_2_1_2_1_2: {
                                                                                text: "Einige Zeit später bekommst du Schüttelfrost und Atemnot. ---- Du bist durch eine Blutvergiftung gestorben"
                                                                            }
                                                                        }
                                                                    },
                                                                    option2_2_1_1_2_1_2_2: {
                                                                        text: "Einige Zeit später bekommst du Schüttelfrost und Atemnot. ---- Du bist durch eine Blutvergiftung gestorben"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    option2_2_1_1_2_2: {
                                                        text: "Nach einer Weile merkst du dass du leichtes Fieber hast ",
                                                        options: [
                                                            { text: "Krankenhaus suchen", next: "option2_2_1_1_2_2_1" },
                                                            { text: "Weitergehen", next: "option2_2_1_1_2_2_2" }
                                                        ],
                                                        suboptions: {
                                                            option2_2_1_1_2_2_1: {
                                                                text: "Nach einiger Zeit findest du ein Krankenhaus es sieht aber Instabil aus",
                                                                options: [
                                                                    { text: "Reingehen und Antibiotiker suchen", next: "option2_2_1_1_2_2_1_1" },
                                                                    { text: "Draussen suchen", next: "option2_2_1_1_2_2_1_2" }
                                                                ],
                                                                suboptions: {
                                                                    option2_2_1_1_2_2_1_1: {
                                                                        text: "Als du reingegangen bist fiel die Decke auf dich runter. ---- Du bist gestorben"
                                                                    },
                                                                    option2_2_1_1_2_2_1_2: {
                                                                        text: "Einige Zeit später bekommst du Schüttelfrost und Atemnot. ---- Du bist durch eine Blutvergiftung gestorben"
                                                                    }
                                                                },
                                                            },
                                                            option2_2_1_1_2_2_2: {
                                                                text: "Einige Zeit später bekommst du Schüttelfrost und Atemnot. ---- Du bist durch eine Blutvergiftung gestorben"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    option2_2_1_2: {
                                        text: "Dein Verband war leider nicht desinfiziert, die Entzündigung bringt dich um. ---- Du bist durch eine Blutvergiftung gestorben"
                                    }
                                }
                            },
                            option2_2_2: {
                                text: "Ich versuche zu fliehen, aber es ist zu viel. Du wirst von den Zombies überwältigt. ---- Game Over"
                            }
                        }
                    }
                }
            }
        }
    }
};

// Funktion zum Laden des Szenarios und Fehlerbehandlung
function loadScenario(part) {
    if (localStorage.getItem('savedScenario')) {    // Überprüft, ob ein Szenario im LocalStorage gespeichert wurde
        part = localStorage.getItem('savedScenario');   // Wenn ja, lädt es das Szenario aus dem LocalStorage
    }
    if (!part) {    // Wenn kein Szenario gefunden wurde oder das Szenario leer ist
        showError("Ein Fehler ist aufgetreten. Bitte starte das Spiel neu.");   // Zeigt eine Fehlermeldung an und startet die Fehlerbehandlungsfunktion
        return null;    // Gibt null zurück, um anzuzeigen, dass kein Szenario geladen werden konnte
    }
    return part;    // Gibt das geladene Szenario zurück, falls es gefunden wurde 
}

// Funktion zur Fehlerbehandlung
function showError(message) {
    storyText.textContent = message;    // Zeigt die Fehlermeldung im Story-Textbereich an
    optionsContainer.innerHTML = '';    // Leert den Container für Optionen, falls vorhanden
    createResetButton();    // Ruft die Funktion auf, um einen Button zum Zurücksetzen des Spiels zu erstellen
    console.log(message);   // Gibt die Fehlermeldung in der Konsole aus
}

// Funktion zur Erstellung von Schaltflächen für Optionen
function createOptionButtons(options, currentPartText, part) {  
    optionsContainer.innerHTML = '';    // Leert den Container für die Optionen
    options.forEach(option => {     // Durchläuft jede Option, die der Benutzer auswählen kann
        const button = document.createElement('button');    // Erstellt für jede Option eine neue Schaltfläche
        button.textContent = option.text;   // Setzt den Text der Schaltfläche auf den Text der Option
        button.onclick = () => {    // Definiert die Aktion, die beim Klicken auf die Schaltfläche ausgeführt wird
            selectedChoices.push({  // Fügt die Auswahl des Benutzers zum Verlauf hinzu
                text: currentPartText,
                selectedOption: option.text
            });
            let newPart = part + "|" + option.next; // Bereitet den neuen Abschnitt vor, der basierend auf der Auswahl des Benutzers angezeigt wird
            localStorage.setItem('savedScenario', newPart);     // Speichert den neuen Abschnitt im LocalStorage
            showStory(newPart);     // Ruft die Funktion auf, um den neuen Abschnitt anzuzeigen
        };
        optionsContainer.appendChild(button);   // Fügt die Schaltfläche zum Options-Container hinzu
    });
}

// Funktion zum Zurücksetzen des Spiels
function resetGame() {
    console.clear();    // Löscht die Konsole, um den Bildschirm zu säubern
    selectedChoices = [];   // Setzt die Auswahlhistorie zurück
    localStorage.removeItem('savedScenario');   // Entfernt das gespeicherte Szenario aus dem LocalStorage
    storySummaryDiv.innerHTML = ''; // Leert die Zusammenfassung der Geschichte
    console.log("Spiel wurde zurückgesetzt");   // Gibt in der Konsole aus, dass das Spiel zurückgesetzt wurde
    showStory('start'); // Startet das Spiel neu, indem es den ersten Abschnitt anzeigt
}

// Funktion zum Anzeigen der Geschichte
function showStory(part) {
    part = loadScenario(part);  // Lädt das Szenario, wenn kein Szenario übergeben wurde
    if (!part) return;  // Wenn kein Szenario geladen werden konnte, wird der Vorgang abgebrochen

    let parts = part.split('|');    // Teilt den Szenario-String in Abschnitte (mit '|' getrennt)
    let currentPart = story;    // Startet mit dem vollständigen Szenario-Objekt
    let currentPath = '';   // Hält den aktuellen Pfad der Geschichte fest

    // Durchläuft jeden Abschnitt, um das richtige Szenario zu finden
    for (let i = 0; i < parts.length; i++) {
        currentPath += parts[i];    // Fügt den aktuellen Abschnitt zum Pfad hinzu
        console.clear();    // Leert die Konsole für jede Schleife (für Debugging)
        console.log(currentPath);   // Gibt den aktuellen Pfad in der Konsole aus
        if (currentPart[parts[i]]) {    // Überprüft, ob der Abschnitt im Szenario vorhanden ist
            currentPart = currentPart[parts[i]];    // Wenn ja, geht es weiter zum nächsten Abschnitt
        } 
        else if (currentPart.suboptions && currentPart.suboptions[parts[i]]) {  // Überprüft, ob es Unteroptionen gibt und ob der Abschnitt dort zu finden ist
            currentPart = currentPart.suboptions[parts[i]]; // Wenn ja, geht es zu den Unteroptionen
        } 
        else { // Wenn der Abschnitt nicht gefunden wurde
            showError("Fehler: Abschnitt nicht gefunden, aktueller Pfad: " + currentPath); // Zeigt einen Fehler an und bricht den Prozess ab
            return;
        }
    }

    storyText.textContent = currentPart.text;   // Zeigt den Text des aktuellen Abschnitts an
    addToSummary(currentPart.text, parts.length);   // Fügt den aktuellen Abschnitt zur Zusammenfassung hinzu

    // Überprüft, ob es Optionen für den nächsten Schritt gibt
    if (currentPart.options && currentPart.options.length > 0) {
        createOptionButtons(currentPart.options, currentPart.text, part); // Wenn ja, werden die Schaltflächen für die Optionen erstellt
    } else {
        selectedChoices.push({  // Wenn es keine Optionen gibt (Ende der Geschichte)
            text: currentPart.text,
            selectedOption: "---- Ende der Geschichte ----"
        });
        storyText.textContent += "\n ---- Ende der Geschichte"; // Fügt den Text "Ende der Geschichte" zum Story-Text hinzu
        optionsContainer.innerHTML = '';    // Leert den Options-Container
        createResetButton();    // Erstellt einen Button zum Zurücksetzen des Spiels
    }
}

// Funktion zum Hinzufügen eines neuen Abschnitts zur Zusammenfassung
function addToSummary(text, step) {
    const summaryEntry = document.createElement('p'); // Erstellt ein neues Element für den Zusammenfassungs-Text
    summaryEntry.innerHTML = `<strong>Schritt ${step}:</strong> ${text}`;   // Setzt den Text des neuen Elements (Schritt und Text des Abschnitts)
    storySummaryDiv.appendChild(summaryEntry); // Fügt das neue Element zur Zusammenfassung hinzu
}

// Funktion zur Erstellung eines Buttons zum Zurücksetzen des Spiels
function createResetButton() {
    const resetButton = document.createElement('button');    // Erstellt einen neuen Button
    resetButton.textContent = "Spiel neu starten";  // Setzt den Text des Buttons auf "Spiel neu starten"
    resetButton.onclick = resetGame;    // Definiert die Aktion, die beim Klicken auf den Button ausgeführt wird
    optionsContainer.appendChild(resetButton);  // Fügt den Button dem Container hinzu
}

showStory('start'); // Startet das Spiel mit dem ersten Abschnitt