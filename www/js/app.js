var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $filter, $http) {
 	$scope.today = new Date();
 	$scope.numeroParte;
 	$scope.totalHoras = "00:00";
 	$scope.mantenimiento = 0;
 	$scope.mantenimientoText = "No";
 	$scope.averia = 0;
 	$scope.averiaText = "No";
 	$scope.tipoDeTrabajo = "";
 	$scope.esCasa = false;
 	$scope.checkEmail = true;
 	$scope.firmaPepe = "data:image/png;base64,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LDCufetytu0VniXZIppkghUfTjazFBsOcSvGLPvPuy0SVt4I16B9ecp27LHHqgsuuKB0zceMGaMQ8kSK9Ea3faQbbLCBeumllzIdg81D/r777nNevd1+++1q7733buqEC87mdjytsriE/fLLLweaaSeywsBIWGnfkjapX7VtIexJ2M6ZAh3PO+88hUSfWmToZ/y+1VZbqXHjxmU6M1tvvXXDPvaPf/yjEVXUFFdS2HLLLdX48eObVeEy8fjjj2ei52mnnaZ+/etfB9raaaed1N/+9rdM2q9KIySsqsxEyXpUbVso7TD4f9iTNtlkkyZSm222mcKpoSmIqmCSQhawSmykH5frSimvS+fXXnutGjhwYGCodXJR8ZkjEpYPWm1cdu2111ZvvPFGc4Qw0koP6aKGbyMIuapBZEysIExBOrNp06ZlqmZY7CrZicsqS24pcVhg+sElUfyhhx5SPXv2DJxs5u3flUTPrOqQsLJCsg3aMT9ObMfmzZtX+KhcjcaSSLLW96233lJrrrlm6PhHjRoVsEe5uChIwnIhuagJgPPseuutl3iLWvjkZtAhCSsDENulibKdSOVVIeBq+6ilnkldDMLmDXYfrFqiRPtxmfo9++yzavPNNw+tljVhIUSQPGXEieqRRx7ZLq9kyzhIWG07tf4DQ748Mz5S2hWAjwZrrLFGyx23Tz75pBEb3RS5AsvaVmO7LKy3WCZRIlPyIYccopDDT0vcVixLO6GcK+iw/PLLK+jfzkLCaufZTTA286PERzFjxowErfhVQVz0G264IVDp8ssvV0cccUTgN7lCiSMIPy3+t7TN2K/tZybhYDU4f/58rwiiZnjkNLrDZWPq1KmB4X3ve98LxGlPMvY61CFh1WGWCtSxaPcGfHj4AE3Zfvvt1d///vfAb9/61rea12o0sUhDfFqYbGQ1evTopp+VTN6AFeiECRMa8d61wM3i3XfftapiEl5SwoJrBMIam6vfpG2lxauM+iSsMlCvcJ/4S21e8M17WyhJAqSAraApsFHJAwBXvdDep59+Gou4zSkUqeTPOeecZl0QEwhKi77y4kryZrkkW9nddttNwVG1o5JV4w/V14P/V+xsskCHQUA6bCLQGwK+5SGSrGxXVeCqgNMwU955553G3cE40asyuEDYPOZ1fVzvkXftevToocaOHdvShY2cXG1TZl29pYwbg35+wAEHqD/+8Y8thxAd7fMlYbm+MR2oXBEXdF3cF5CAVF4Rgr3r+uuvd54NjAX//OpXv7ImL7UZ2V23dVAChCG3q2EkYuKKKBmzZ892GseQIUMaKz3ZbkcjK66wnF6XjldoySWXDGyjsv4wZEgb/eFLpOUKbKONNlIvvvii14SYxGjzlbLZrRDYMGwFh2QV5kEEyi299NIBj3sXwkJqLdii4gRJbnG3UwrC4MCIX5ZIb/+i9OAKqyika9QPVjVmenWkVT/hhBMyG4EkiRdeeKERg90UWWbZZZdt3OPzlSjfMpttzMWPSW4LzzjjDIX081pshIXUYYhcqsU2Zjk2hMXBZWl5uIDQzXF+Yr44+ZTX45c2Pp82kpYlYSVFrs3rmR9lUrKwQSQJxOY64XI1xxV+2R9CxYAIYLzeddddA83su+++gUxCYX1IwoLzJuxvWq655pqWu30y43LcqnXixImN00eZ0QeXnE855RTX4WdeTs8NbGojR47MvP24BklYcQh10OeuhmQfeJZbbrmA3cZ2HC+3o2g/7uMO0wGxsKTnObzDcbCQZgVnw8Zsb5999mlk7DHFZ5v90UcfNeJ8SS92HBzgAKEs0WNEMEUQahlCwioD9Rr0iazAs2bNamqKJJwwLqeRqO2ZbteljKsOn3/+ecATXdcD4ZjbLF8/pjjCsp0A+vwBkP5e0DvLVa4rfmY5PS9Zmwd8dSFh+SLWQcrDdwmrAi2IB4644ElFfrC2WFCSrBBY8JVXXknaZSMfIeK8xwkiHuy4445xxZrPbVeY4pxC457rxmXUDPyexGfLeTAOBfW84DACV6jKFBJWmehXvG9Xh8i4YdhOuuQ2D+GGcdXFXGll4ckuSVDqius/uAbkI9///vcVfMG0YCzyIrIcn6lH2GVtbF+xjTUljzDKLmNFwMLhw4c3jftJt+UuffmUIWH5oNXByvpsY6Kgidvmvf/++wq+T6Zk9YFEEVbSkDSPPPKIQjA+Laeffnoj6eqjjz4aIDFzPKYeNmdc2KcQElrWyYK0fV/brObdt1+X8iQsF5Q6aBkZ0TOJ74+86mMjibCTvCxgDyMsX7uVqYu8DdClSxcFQ/vgwYOthCUT1kpPfRAY4mtVkazS4JTF/Mk2SFh5oNpGbZof/O67767uuusur9HFra5kAoysP5AwwkprHzPbxWEEDiXM38w8gNKvzVw92rICZY2B64TZsKpatmgSlutsdtByaexY0q7zi1/8Ql166aUtK4k8toK6TdsVIP0szbbThov5m5kAQtqmdL+/+93v1LBhw1rerDR6JX1NbWQFNxTzpDhp21nWI2FliWYbtpXUnoFUXPfee28TEduqwYwPhYJRd/iSQhtlw0LyhgMPPDBR03GEhcB+OkqEHCcICZmjbX1XhazgnAon1aoJCatqM1IxfeSWzfWDitsK2sIQu7btCpEt5LJZ1yUOe1hfcYRlJlmVZTH2nXfeufTLzLhSdNJJJ1Vihec6pyQsV6Q6aDlkdllrrbWao3cJN4PVBZw2tSCZg5mRB79LQrvyyivVoYcemhnK2JLZvMLRr0mMSUkyjrDg+oBEFnKsesVaduSFPfbYw2qPTIpHZhMX0xAJqyika9yP+XHGrUqefvpphUgEpsiPQHrRZ51EwkaIWh9sz7788sumekmNynGEdeONN6r+/fu3EJbtNYCdCPaiogS+XSYGut+qk1VjXhnAr6jXpL79+NixZFmEUDEJ7OOPP26EY4kitLRIRRnasUK87bbbml0kPZGThGUSFBo3E2hE2dGKJglbZNWkGKSdpyT1SVhJUOtgdWT8qrCPDEQEQrKJ/ijkB5P2yo/sy5aowtQX8asQcz3ttlASFsLjIGSMbbUSRljYMmLrWJTYVlZ1IiuusIp6U2rez0svvaQQPE+LaceCdzbu4SVZKWR97QQnW/A6l6s3k8TwgUo7XJKPVhIWoivAY18SFkLYIJSNlPHjxweSV+T9isioqI2P/2ssyvCkTzNWrrDSoNeB6pofKGxOcJS02UF8IElCclHty5WMdnSNi66ANn11kYRl2vZMIrBtT5PcGPDBVZa1rfDibJFp+suzLgkrT3TbqG3pSxRHHHCHGDp0qLr//vsbSSwkIeCD2X///dV5553XYtNKApvcCpofpI2wfOxyNn0kYZnj04cILnHrk4zVtc5xxx2nLrzwwpbid955p8IpYR2FhFXHWStBZxl8L0qFadOmKWS7gdiMvGEEkHR7Ap8mhIgxxSQQWzgYRMs86KCDmlV8t0dRhn0d912SNML1hNn4sp5SuJJotwqzbXNusu6ziPZIWEWgXPM+9ttvP4VTMJtINwH94SN6Qe/evb1H7pv+Ch3EOanKfIKaSOLqRSkv41u5bCmRpgtY5i02MvUl5Lx1TNo+CSspch2kHiJdImSvFB1UzvbRw9EUDqdJxefjkh+n6WGu+5eHBjrnoFz94QTRjHMVpb+M3+UyVhdSc2knqkw72ausK3H6YaV9Rdq3fpiDoR5xp06dAtsOrLbwwcCo7CL4gEFu2LrYPua4DxxZaJCNxpSwOuaHrKMryNWZD1Hi3qN5Khg33jycY80+Tz75ZDVixIgWNZDa/oknnohTrzbPucKqzVQVq6htWwECiyIjhD0eN25cqKKIjWVe2THJpV+/fi2JG+JOsuRqYurUqWq99daz9m/zTEfBpMb3KJ8zmwJnn312I5lrHrLVVlupJ598sqVpHHj06tUrjy5La5OEVRr01e3YRlbawTPMCRIOkAhUFyaoBzIBqWixrYZk+2HxzKWOcZmUwwhL5iZ0jZ+OscCAHSYIrQPXj6ixZvEG1PmaTZLxk7CSoNbGdWyEdMMNN6if//znjVGHEdZqq63W8CAPE5CTdKJ02b7pVZCZn8+Wwj5u+xhlYA8js6hpjjqIgC5mm0nvK8a9ZjZnUFfCjWu7qs9JWFWdmYL1Qlbl5ZdfvqXX2bNnK6xetMiLy/gd0Rk+++yzUI31RwSbl7kKiyIZSTDSMdPsLI6sNOmFXcdJsi28/vrrFZKJSsGWGfYkbAG1DBkyRJ155pmZzqhtFVx2KrBMBxjSGAmrCJRr0Idt5WQjgosvvlgNGjQoMCKQUNSdON1OXGYZs1H4ZIHoTIFvF8LUmKstfeIXB7GMjWWO7fHHH1fbbLNNswlbCjLZvs2RFnqBSNK4S8SNA0EBl1pqqZZDiquvvlohu3S7Cwmr3WfYYXyuZIWm5GkUPlCQwbx586w9mZE3fVcyV111lTrssMNCR+Cz1TrmmGPUJZdc0mwLEVHNE0YfkrFtxdCwzb/LR8e4qXr++edV586dW8jq2WefbclwHddWXZ+TsOo6cxnp7UNW6DLMhhWmjrmSSWIr2mSTTdSLL75obd5lK2hWjOpfblfnzJnTWMlICSMrTcySlGHXkynMkkwdtpjYWsrxJL0dkESHKtQhYVVhFkrSwfbxRZEAVihYqbjKkUceqS677LJmcZMwbFFIw9q12WtgE5IfcJxecaso87nNHhQVchmEB2fZJKQcp7ctZ2Gcy0dcm3V9TsKq68yl1BtuCn/9618DrcStWKLuz9nUMduDcyhISgtCrrhe3cFKBwHxTInT1aZP3JY0itBk2GfZvi3OFozyuLOYRmx3ONv9JDAKLxJWmrepxnXlx/mHP/whcBlYDg3p3JGmy1WQwgr2Li1bbLGFmjRpUvP/XQkHflsbbLBBS7embcxVJ9zlQ4QILYjxZW434RWOOFVazjnnHHX88cc3oknEXVpeYoklmllydH3XMYbpjzbl6WtHXVlpjEhYrm97G5WTKw2XQHqyjnSMNOGxXXGR7hCuH3OUzcy1Dalb8+W3BLCTWzpXYkQ9U5/f//736vDDD0/81thWs+uss4569dVXE7fZDhVJWO0wix5jkCdvLvfncO0D1z+0wPb14YcfhsaxsgWoi9uO2YYgt2GSFGxp7+OgiNMjLhyOjE5h688F0yg9bWQFx9zp06fHDa/tn5Ow2n6KgwOMMzzb4Aj7yG2rn7DwMHFEIfudMGFCSwhh6UGOOr6rLPhYmZeB4dtlXrEBKayxxhrWt+Lll1+2bk9lYV+dzPo2skL2nbDwPh3s9WXWnI404dJxEx9m1P0/c+uk/9u0ofhE1PQ9PZNkiNPJiy66SA0ePFidf/75zWmDfckW/iZqXuN0sRHxWWedpe644w6FLEBRYkaC8H23bP0iOzQyVFP+FwGusDrImzB27Fi1/fbbB0brshLAtmvBggXNetgedu/evfH/krAQwRPGe5vEkYRZR17olVusJKvEqFWMiYONhHWkUNmv3KImWfHZ/ijo35AhGglhKf+PAAmrg7wN8mP74IMP1Iorrhg7+jByuOuuu1rigkd5dZvtRJ10ueQtxDUUM0u0q2FcDxannTj1NMlCXwUKc8QEaZmuFfDTwj1LU3ApGzHqfcXXede3/XYqT8Jqp9kMGQsuNeNysxbt5Bg3dOkDhJWVjrsUdnrnEoHBFhVU6yJXOGEOpr42MTlWqT/a8/Eaz8KeBp1IVnFvYfA5CcsPr9qVvu666xTsIHI14TKQsNVV1EmajbB++MMfKtx304KQxTbfqrXXXrtxudlFV+mf5eufFBfiGCs4nKjaRJ9eyrG6bLHN9khWLm8hCcsfpRrXkB+FT+RLm91JXiKW0MggfXjuuhrytU3Jdn3z/YWtEnEDALG7wjz7cQXH9NrXGPgQFskq2UfFFVYy3GpRC6eApu+Oi4No2NbMFonABoLNB8mFiGQZlxAvIBZcMdLie2XFRkimhz4iOtx7772BYc6cObNh+7OR06xZsxS20XFCsopDKPw5CSs5dpWv6UIUYYOw1Q2LVCDbkB9z3AkhPLhff/11p62g7Mt19SbrhYUWRtx5fR3GdioIg/2ll15qhQ3byCuvvDLyvfBxBan8C1aCgiSsEkAvokv5Yeyyyy5q9OjRTl0PHDgw4PuDEzJcM4EvkovgpAwnZtgIbgcAACAASURBVBB5B9E03Ou20hCrzJzj4v0uDyFshBu2XYwaf5w3OsnK5e2JLkPCSo9h5VpAavh99tkn0YoFlWyrFtupGlZS+AdbMTMKqOntLg30Uasv9A3bkYwiEQewD+FhBTV37txAkzZ/qrg+8RzkOH/+/GbRKKdRkpULovFlSFjxGNWuhPyAscXBh+oqcguHeibRwN8KhKivi+ikEGYZm81L2rfkhWjfkz49HhmueMaMGQrp6aVsttlmClE7TUGa+wcffDDUwB6F2RVXXBG44Gyz39n+AKAcIrSC2Cl+CJCw/PCqfGlpaPcN0Su3S8ilhzArptgMznvvvbe6/fbbm8Vee+01BTcFk/zMaAO2xJ8+p2xyIsx+bMb3vfbaS915552BamaSUYSRsTl9Qifb6gjRGIDtIYcc0mzTRli2ur6nmZV/6QpUkIRVINhFdOWzPbLpE2e7wX26Pffc0zoUsy5iTeFjfeGFF5plTe962c9RRx0ViLnui1XUuOX9Q7T9ox/9SD399NMNZ1EQj40scfcS15Ik6eiVIILz4TqSFnkKy22g7yzGlydhxWNUmxLycnOUR7ltUDLAnfT+jnMbiNtKalKQJ3RhER58gN94443VlClTmlV0LPWhQ4e2pNjSK70wPyuzX3klB8+wWvvzn/+skK9xwIABzeJmYgsb8cN2hjmhJEeAhJUcu8rVTLu6ivP+jtuyIdnC+++/b8VFkx3Sp+PE0pS4dl2BNscPAzh8qHr27BmoDj8p3AnEtswmLld09Emk9MzXhMSVleuM+ZcjYfljVskaMtidy/G+OZAvvvhCYYWmRZ6c7bbbbi1OlBKIL7/8UmH1ZJObbrpJ9evXr+XunKuzpQvoccH3ok4D8QxOtiDdOOKGLjbbVpi9izYrl9lzK0PCcsOp8qXSrq5kPHNzwHFbQbNsmA3M9jGDHKLS2/uC3qtXr8aJn49AX9xtXH/99QPV4mx5SKCB1aIWvR1Pe7/QR/eOWJaE1QazjoB2MCxrQfICmWUmbphRH6jPls2WCgttI8TyuHHjAmr4tBunv7kydC378MMPK6TQkrLMMsso5CX0EdvqLY/x+ejUjmVJWG0wq2lXV7Y7cxoWX7cI2KfMlQfaeeihh1oC0eX1McetjPB8xx13VAiOZxPkUoTLgo/YyOqVV15R6667rk8zLOuAAAnLAaQqF8GHYW5n9FG8j85Zra7CVjnyg/Y9vXQdSxxZxV2dee+99xTKmBJl90I523OZ4sxVf5aLR4CEFY9RpUvEXX2JUx4hjQ8++GBrMdwf9F1tSMdVW8NZrq6QvWfllVeOTEbhGpFUEp5ZD/YxrMpkOGUZ9O+WW24JXIuKw5/P/RAgYfnhVbnS0vfJJ2omBhPmi2Tz2nYZfNwqB24PIJi08pvf/Eb99re/dWrGhSCl3rbxg9jDYtZDEQQlhAGfkh8CJKz8sM29ZaSowhUYLYizvvvuu3v1G0YwSFrRo0cPr7ZgWNchlG0VbcH9vDr4ujC807t27RpZbbHFFgtccD7jjDPUiSeeGFrH1W9Kun6YDepEFb7jYXk/BEhYfnhVqnRaY3uRq6ukKzYTcHnJ2TYZtkvXUW4ZtjajVmQ2gvdx+6jUC1RDZUhYNZw0qCwTgmK7gmwyPhLlM+XTDsoieF1U/y7bMlufcEZF7sHPP/88VqUzzzxTDRkypFHOJbCfLdSMdnC1dYYgg7jWY4pPFNfYAbBALAIkrFiIqlnA5YOM0jws4mbSlVDcvbwkhOXjD4VwNzB4a9l8883V5MmTm/8v+8e2ESFeTMGlblzutgn82pZaaqmWR0nGVc03qh5akbDqMU8BLZ955hnVpUuX5m9ZOoom+QAR+WDixImRSOLenWlviypsCwWjy9vu+h1xxBGBPIO6rLmCXGWVVRTcFiAbbrihQtp5U6KSwKJclqvRGr5ylVGZhFWZqXBXRHqT+5IMtk6IYiAl6eoq7mRQf/AuJ5hh9wHRhxlPS+sON4q3337bCp7NxgcD/EknnRQoj5VTlGd71n5q7jPNki3v6Ncv+78IS30Q0BmKzRWHGZ7YZSRhH2BYpM6oNuGigDhXNvLDb7YopLb2ZO5Cswx8oPr06RMIlofnccZuuU0dMWJEC1mttdZagQQYUre4C9XvvPOOWn311V1gZ5kMEOAKKwMQi2xCRgSFbQVbQlexeXP7rIDCiEn+DqKSIYlhU8JvUsLsX9prH1mrMW5TXFaDiA9/3333hUIDG5lMN28Wttn5HnvsMbXNNts0i1100UUKuRopxSBAwioG58x6Sesoiu2P7WJ0koU2rrFou5A5QATSg51IE6F+Jm1t2267rQIB2MTUx8WpMwzgsNUk4snDSz5MbGQFnbB1BNFpQVjo//7v/85sftlQNAIkrBq9IXLbpCNf+gzB9gEnvdtna0valGx2JKyYQBg2kpTbPLn6cllZyZWYxCcuVhieIzSyKWEEim2mzR7oMycs644ACcsdq9JLpnUUlSsePaAkqyvbNs7mkySTr8qUYCaoU6dOVfCG12KzH/nqKjGLs3vZbHKyT7NNkBVIi1IMAiSsYnBO3QuSOWy66abNdswMxa6N21ZEtjhVce3Z3BjCVj5Iq2WzW5l92K612OJqPffccwEM4vS0EZ6Z5FXWh4Pqxx9/HPgZW0Dpf2XiaDqrxunD5+kRIGGlx7CQFtI6itpWV0nuvyHfn7T9hJHVq6++qrbYYotQL3XU+/TTT1tyJiJcDsLmmBJFNLYJCDvdC4vvZbPt4Y8EkluYAn2BmxZEs0BUC0oxCJCwisE5dS9pje3yA/a1BWEANhKwtYNL2HBDwLWaMNFZbeRznZTV/B2kYaYLiwNTJmiV5eUWDytX2f6xxx6rLrjgAmtX5lyEjSNORz5PhgAJKxluhdaSf/1dEkJIBeV2EJ7yEyZMcB5H2IrF/PiRdPXcc8+NbXPgwIHqmmuuaSmHqzK4MmOKb0DCTTbZRL344ouBNrBig31MC0JKH3fccY3/tcWy79y5s5o0aZJ1HIhisf322zefIZwMwspQikGAhFUMzql6SWtsD8tmAxIC+cGPCGGDwyTMTwox0XHlBff25Kma2Ra2YeZqK8zwLcfpm7p+v/32UzfeeGNgGFg9wfZltq37t3m9r7nmmuqNN94IxQJ3DU03Bt9DgFQvAisrElYNXoK028G4i8l4DtcGrDYQ03yPPfZoohIVggaFoj5Yk3DkaaGsl3bLOmrUKNW3b9/AbJpXbiSGWAmaiTtQETouXLgw8o2AXc6M1U7CKvYDImEVi7d3b/K0LInNxOWun7diERVsmZzhEQ67kJYDDzxQXXvttY3/tZ3O+YzTdhIpV2dxpO2abENue0lYWb458W2RsOIxKrVE2u2gtLngw8XHieiZWUucvcm2UpRhYKAT0sDDKdZVXD3hw4jb5wBCxiEjYbnOUjblSFjZ4JhbK1lvB//4xz+qadOmKXhzIy56WMp21wFBv7POOkth5REn0oMcq6yRI0cGqg0bNkydeuqpcU01n7uSFSrYCMuHrNAGMuJARy0kLOepyqQgCSsTGPNpRJ54XXfddWr//ff36szFfwsGcbR77733NvyiwgRXg+CucNRRR7X4TrkodfHFF6tBgwaFFvVxYn3zzTcVIi2YEkc+NsLyJRx44oPwSVguM559GRJW9phm1qIL2cR15rpC69+/v7r55ptDmzvkkEPUVVddFddd7POwbVncdtJs+IknnmiEiC6arNAfXBqwzSZhxU51LgVIWLnAmk2jrmQT1pu8zvPZZ59ZV0ZIl4XtYZjgmB/H/VmIzfgdtzIy+wWpglx9yCrM4I6QNTNnzvQa1rLLLqs++ugjEpYXatkVJmFlh2WmLeGjwMehpWfPnuqBBx7w6sN1hWaLToCO8kiwYHNfsF3PsQ3017/+tTrttNMyISs04kOUulOJle+W0msCWbgFARJWRV+KLP6Su54wwvkT0Ua1uB7x+0Ingw/q+i4fPbzP4QBqSpxjadhVItcoqLbxpc207YsZywcRIGFV9I1wJZso9V22lDp7DBxG4fWOKJ15iG115EpYkrxdVn+2rDh333134zoSTvq0LLfccmrWrFnOQ3ZdtTo3yIJeCJCwvOAqrrBJNiuuuKI1bnqUNjJBaFhUAXh7P/744+qpp57KbXBhV4NcVnS2VVKcR7otNI3pLpHmjwEJK7fXxKlhEpYTTMUW+tOf/qT23XffZqdRyT3DNKvShyUJwhbEz7YttJ0omum6bGPH4cBbb70VeAQ/sRNOOKH5myRzELY8dQzDNQ3ZFfsWtWdvJKwKzmsWhl2X7WARQw8LcSyv4yDiASIfQOBfBT8rKQMGDFDXX399qNq2fIM4UZQXotFAEnzkxeckRvsiMG/nPkhYFZxdW2QBXzWTfJC+fcSVx4Xq+fPnB4pFJZfAszAXBKyavv/974d22bVrV/X0008Hnnfr1k2NHz/eWifJChR2PmyttcQZ/ePw4XN/BEhY/pjlWgMherH60LLzzjurBx980LtPk7DK+LB69+7d4oaBwH677757cyxxOf/0SiguAWuPHj3Uo48+GsAIuQzvv//+UNwQkQL6aHFZLYEAzRhiPs6u3hPIClYESFgVezGyulxrEha2Ski9VaRIW48ta7MmpDC9XEI4IzYVtmqmRK2szHI221pUlFTploH8hJIoi8S4I/ZFwqrYrCfZqtiGYH6MRX9YkgiiTvXCtoByNWYbIyKHyphWiFUl48GHTTGuG8nIp4jPbm77zLpyRTh37txGHDFKcQiQsIrD2qkn82NP42lutmOLT+WkTIJCPnkEsYKyXbZ2cSRFRIfhw4cHNMRW2rw246K+jTBfe+01tfbaaweqI2s1EmqkcTp10YdlohEgYVXoDZk4caJCCi0tQ4YMUUgjlUTKMLrL1PTQO4x8ZNQDPUYXWxIM6YiOasriiy8eGWkiCkMbaeGwAESv5fTTT1ennHJKoBkXYk0yd6wTjgAJq0Jvh/TOTvNBZLW1dIVHHhag3pNPPqm6d+/e0kQYWemCV1xxhTrssMOsXdv6icvk7DKGuJUhbgGMHj262VSSvJAuerAMV1i1eQeydEqU9wPTkJ8LgFJ306/KrG+7E7jLLruo++67r1ksaiss+3FZkbnojzKStMzTVfksLPKFa18slwwBrrCS4ZZLrazsV1BOZoTJk7DiVicaLAQAfPbZZwPYQc8TTzyxkQDCjH7q4vmeJVlppSQhatLK8o9JLi9PB2mUhFWhiTY/CsSnkkZlH1Xl/T14e8s4Uj7thZWVRINyNrJBRhtktjEFjp6mzc4cP07fcAoXRiR5kFVUX+aY4q4HZYEr27AjQMKqyJsBm4j5gWaxIjIJAKGNJWGkHfpll13WCJdsis0j3RbNFLHlkUfQlDC7m80ongU+YeMfMWKEOvnkk0PhybPvtHPS7vVJWBWZ4TyM5CZhbbTRRi0ZkdMOXW6TVlttNTV9+vRAs/jwQQCmhHnvb7vttuqxxx5rFoVX/D333NOyYivC/wljee+991ogwsX0n/3sZ2mhY/2ECJCwEgKXdbU83BDMNuEGgFjoWUmUgdrsw4XUwsqjrlzNFLm6kaeZYRmrs8KU7cQjQMKKx6iQElH2m6QKmG0igB5it2chcZeadR9hBuwoHaLuF/79739vJIEoWi655BJ19NFHF90t+7MgQMKqwGuBqyTrr79+U5MjjjhCXX755ak1MwlDxoRK2jjSgcH+ZAp8o+C1borryaHUIyzY3y9/+Ut13nnnJVWb9doEARJWBSZyhx12UGPGjGlqksW2529/+5tC4gotWbS5cOHCgPc32oadyYx6gN/gRyUvEbv2b1thZbk6rMB0U4UUCJCwUoCXVdUsPdy1Togd9c4772RKWHKLt9RSS6k5c+YEYLB5sbuSFcK1fPHFFy2w7rPPPuqWW27JCm62U2MESFgVmLw8MrFkferousWTpAbbDzI+x0lcbCxX0ovrh8/rjQAJqwLzl/cJYVonS6SQx71AU1w80V1P1WSMdfQDgjQD9yHm1Z577lmB2aIKZSJAwioT/f/r2ySsrHICmm2muRz8zDPPqC5dugRQsmWCXmKJJRTu18WRmoTb5hSqDx3yIPIKTDdVSIEACSsFeFlVNT/MPE4IfXPv6XHBngS7kim2YIA4gcR9wCzICnGukJJLr7IYfyqrt6w92iFhlTyPn3/+uUIsJy3w+ZHXXZKoaJJg0gB+cvWzzDLLqNmzZ7eoI+1W8PfCyV6Y4AQRdxDltlIGzps6dapC1Actabe2SXBknWohQMIqeT5OOumkRmQFLVkZl02ySRK7SUYDDUtkIUktbkv79ttvq06dOrWg/tVXXzXsVlJk+2HlSp5Gdl8QAiSsgoAO6wauAZ988knmhJXG/oNIp2effXbsFg8rLunWEEW4N998szVihE8dV0N+ydPK7nNCgISVE7CuzUrfo6xWWGkIS27xHn74YQXnVlNsxvgo3bHNRXQHU1y3eFm7aLjODctVDwESVslzYpJDlquHpB+5JKswp01ZbqeddlLwrrfJMccco2CbM8VnrHfeeafaa6+9mtV96pY8vew+YwRIWBkD6tuc+eG75OFzbT8JYUkSWn311QPe8rpv2TZcGsxtramjLe18kmxAeTjXumLJctVBgIRV8lyYJBFGEElU9CUsSQhhxvNVV11Vvf/++06rHRmUEJWiyC1qnP/4xz8UEplqicp1mAQv1qkHAiSskufJJCzYeI488shMNPJZkciMxlDAZo+yZVkOs1vZQienDS0sPeKjsutkAiIbqRwCJKwSpwQfHBxFtcycOTOwikijmvy4w4hl1113DWSsQZ/PPfec2nTTTQPdL1iwQMFj3pRp06apH/zgBy1q2rzXsTV8/fXX0wypEQEC20ktrkb7VJ2ycqUQIGGVOB377ruvQshdLVmdEKI9l9NHuc1Cvb333lvddtttLahI+1avXr3U/fffH1sOBXr37t1Ciklhl/5hYXokbZ/1qo0ACavE+ZFpr7IkrEGDBgWiJMDutPLKKwdG6xq+WJZDOBx46JsSFnhv4MCB6pprrskUZalPlrhlqigbyxwBElbmkLo3KC8MZ/3hmR827FTYcprbKVNTV0922zZs8803V5MnT24Z+MiRI9UBBxzgDohjSYlbmO6OzbFYjRAgYZU4Wb4neb6qhjmPuqbNcondbmsLemZNvnLscpXVo0cPNXbsWF+IWL5mCJCwSpwwn5O8JGra2nclK2lfQ//m5eTbb7+9Ye+yEYkZxyqJ3i51HnnkEbXddtsFiuZNki56sUy+CJCw8sU3svW8V1i///3vA24ScDWQIYhtHzniWmHbZUr37t2bQfzCooMmcQhNA7/vXcY0fbFuNRAgYZU4D3kTFoYmt07mcPv166duuukm6yrJ/HHppZdWH330kbJditblyvKJkhgWTZolvj4dsmsSVonTXgRh2exQGLImITl86b8FwkMaL0SVsK3GqkAQkpR/8YtfqEsvvbTEmWXXeSFAwsoLWYd2iyAsrIyWXXbZgDZhJCMz7aASUra/++671tHMmjVLIZpp2fL888+rzTbbLKDG448/rn784x+XrRr7zxgBElbGgPo0VwRh2baEtnt4MJTDNuUiiJD66aefuhQtrAwSrV5wwQWB/miELwz+wjoiYRUGdWtHJmHFRepMomaYy4FuC8SFrR5yCT722GOxXWB7OXfu3NhyZRXAXcUZM2Y0u+fVnbJmIr9+SVj5YRvbcpoge3GNx+X5i6tvPoeeCMDnkl/Qp908ykqSlg6zefTJNotDgIRVHNYtPZmEhUvEuEychcgrP2gTWyacCH744YdeXcA2ZPNi92qk4MJyG9y5c2c1adKkgrVgd3kgQMLKA1XHNqOuzjg20VIMsdjhfmCKXGXstttujcvIYTYe6LXCCiuoDz74IKkapdY7/PDD1ZVXXhnQYeedd1YPPvhgqXqx8/QIkLDSY5i4BZOwunXrpsaPH5+4LV1Rri7C7tlNnz5drbHGGoH+ELcd8dvbQWS0Coxpxx13VA899FA7DK/DjoGEVeLUm+SSRT5Cab9B+6NHj26Ed5EiiS3ML6tEeFJ3bTt0YKTS1LCW2gAJq0T4TdL41a9+1ZJay0c1JEtduHBhswraPuywwxSu50ixEVsR9/98xmOW7du3r/rLX/6ikJMQ29ii3BWAIULpHHfccQr5I4ExpVwESFgl4Q/3AMQ81wK3gq233jqRNjAqI0qoKWGGZhmaBXWKIgDXwSGw4EorrdQgqCoKCL9nz57qnnvuUXBHoRSHAAmrOKwDPd16660KKbS0gMDg5+QruMwMe40ptgB7eH7DDTeoAQMGBMpWiayQhCPMq94XlyLLg8AOPvjgFkN/kTp0lL5IWCXNNGKmv/DCC83ekxKHzZN91KhRqk+fPi0jk2V/9rOfBUI0lwEFbHfYcvmspvQ48G+9wkHEU40hCHzFFVdUuGr0xhtvKLh5vPLKKw3vfDPjjzletAX7FrbGaCvJyjMP598y5qTKfZKwSpodeSk5CWHZLipjBXXddde1jApbLNMHq2wv8OHDh6tTTz01En1NSMgkBAJatGhR8x+QCrbRU6ZMaXjfI9TMBhtsoLBKwzP9D4hQ/vcTTzzhNOu4R4n6IDGE3Jk/f34skcGOCOKj5IMACSsfXGNblWmwfAlro402Ui+99FKgnw033LDxAdukKnHQhw0bpn73u99F4oMtFra10Bn/jX/0f4M8EE8eW2H8BuKHnxkudMO7H2Xxb/wDQtf/bf6G3997773GCjcOd/SBf37zm9802sO8oS8EMLRdZ4prL/bFYIHoP2JfA/wvYlQ8Anjp9dbDd/tx7733qp/+9KcBpfHhYhWAD1YKIirMnj27+fNPfvKThsG4aIm62wg8QLa2tGHQ89xzz1WXX365evPNN9X666+vjj322MYpaBYSd+dS96FJP+yT2WSTTRQiR1DyQ4ArrPywjV1FmC++z98Nm90K28D999+/pU984MgJaH50Zbgw2HSGThtvvHHAlmcOAM6tyP6j04ntsssu6qKLLmqEvMlDNNn7zIXWg3cW85iR1jZJWMXg3NJL0tAy8lIziAB+SmZ+Q7MzaeeaM2dOI0JDUSIJU/eLcZgrTFMfRC+98MILG4ZykC1sWIMHDy5K5UY/uOiNw4A4cgf+uKOJGPiU/BEgYeWPsbWHJIRls1uts8466tVXX7X2gd/XXXfd5rMywsPYVlYwtsOWZQpO8EBMd911V8M+hWs055xzjsKYyxZk5IG9Sq+8MKZOnTqpu+++u7FCpBSHAAmrOKwDPZmE5XJiByOx3Arh+B4XlMNWTGUb2mX/+P+nn3664Wag5cYbb2wQEwzgq666qkLiVRi4KUTAhgAJq6T3wiSsqO2RVs+2UkHccsQvtwm2NLD/aIFbgxncLu9h28jK3F4deuihCv5iOPGDh//pp5+uttpqq7zVYvs1R4CEVdIEmh90HGHZ/K1wSojtU5iUubqykSu2U9hCwaVh4sSJDVeE/fbbr7G6ohABVwRIWK5IZVzOXGHhTiFcEmyy5pprqrfeeivwCB7c8jezAGKbI2CfliJtVzaywkoPhmkkxOjatauC06gtgkTGELO5NkSAhFXSpJofdljIExzn4yjfFPgrvf766w2P7jBJYtBPCwOuvMAGJQWrxyWXXFLhGhD8qChEIA0CJKw06KWoaxJWmA+PzQ505plnqhNOOCGyZ7Oei0E/xTAaVWEov/baa1ua2XzzzdXQoUOtKe3T9sn6HRMBElZJ8x63wrLFrEKY3wceeCBSY+lBj/uDCHeclyDnIbZ6UninLi/EO3a7JKyS5t8kLJnnD6GL4eVtysorrxwaacAsV6SxXZIj9KhCJuiSppTdFoAACasAkG1dmMRiGsXHjBmjEFtdktCLL76ocLk5Sm6++WbVv3//ZhHcuXv55ZczHyHatOlStOtE5gNjg5VHgIRV0hSZhAUD+jvvvNPQxHbKhlM1F2fKIozte+yxh9WdAhE447arJUHNbtsIARJWSZNpEtMBBxygRo4c2Yi0YF68RRlsD6NcGMK2g3kY28OSsyJOFOOdl/QidbBuSVglTbhJWLjvB1+sZ599NqBNWIoum8owrM+aNav5aMKECapLly6Zjc628vPRLzNF2FCHRoCEVdL0S6O7zXEU11WQrcVF8jK2n3feeer4449vUaEd04K54Mwy5SJAwioJf+krJbeC8M1yTSsvozLgMjTCyKQV22kl2iwrAGDa8bB+/REgYZU0h7YtFlTB7yCvadOmhUbflCrnYWwPi8KZJLhdSRCz2zZEgIRV0qSGERaIYtddd/UKYexzkTpuuLjz9/Of/7ylWNwF7bh2+ZwIZIEACSsLFBO0EbaC8XW8xNYRiUe1jB07ViHgXBLp1auXevDBB1uqduvWTY0fPz5Jk6xDBDJFgISVKZzujdkIC2R1+OGHN8LzukpW9wbDrti89tprau2113ZVh+WIQK4IkLByhTe8cbklRF49/GauluJUg1c7vNu1IJgfgvr5Shh5IlQxhQhUCQESVgmzIXMSQgXYiJARJiyCqE3NtMb2o446Sl122WUtTe+zzz7qlltuKQEZdkkEohEgYZXwhtgM7gjUh7TqrvLuu+8GYmIh3ru8MB3Vlsw8jbJ5eMe7jofliIALAiQsF5QyLBN2vcWXLGQ7ru4Gb7/9diPjixTYsHy2oxlCwqaIgDMCJCxnqNIXRLbl3Xff3dqQL2GZqzTXk0VkJkbUByn6LmP6EbIFIpAvAiSsfPENtG6LIJok+zPCzyAMjRacKh599NGRIwlzo8j6zmGBcLKrDogACaugSUfCzSlTpjR7Q07BRYsWBTIL4z4hLkHHic+9wbDYVcjEg/4pRKBOCJCwCpotSTJYESGkDPLyaXE1nJttwUcKvlI2wZ3CTz75pOUReohl7gAABnxJREFUA+0VNOnsJnMESFiZQ9raoAz90qdPn8bVGyRoMAPzuYRrQQYapHXXAkJaYoklWjrlXcACJpZdFI4ACasAyKU3+m677aYmTZqk4Jrg66ketx1EdmWcIErxNeoXAAu7IALeCJCwvCHzqyDdD+CoCYfNW2+9tZH+ysf58/bbbw+kzEJcddMuhkQVH3zwQYuCiy22WGDr6TcCliYC1UGAhJXjXMBbvF+/fs0esJ2DgygEKyyID2HJlPXmCWPYFvCRRx5R2267bY6jZNNEoDgESFg5Yi23b6NGjVJ9+/ZVr7zySjPWlY8DqG37iLuDNpcGF3tYjkNn00QgFwRIWLnAqhSyHk+ePLnZ+nLLLafgyoDfYXDX4kpYcDg16x155JHq6quvtromwIXihRdeyGlkbJYIlIcACSsn7OXqCqeBZ5xxhlqwYEGgR5mM9NRTT1XDhg1r0SpsyycLul7RyWnYbJYI5IoACSsHeJEFB3HWtcBXCvHZDzzwQGusq7iIobjUjPjqUYI0W0i3RSEC7YwACSuH2ZWrK4Qcvu+++0IvF8e5NnznO99pWZmZav/1r39thFWmEIF2R4CElfEMr7feeo0EElrgajBz5szIWFdxJ4VRCSvgd0UhAh0FARJWxjMtyWWbbbZp+EaZJCa73GmnndTDDz/c/Nm0Q4WFo8G2E6eNFCLQkRAgYWU42927d1dPPfVUs0VcZMZdwThfqI8//lghMamWk08+uVEPEUhtQsN6hpPGpmqFAAkrw+mSqysY21dZZRX16KOPxvYSlVhVV+b1mlgYWaDNESBhZTTBWBEtvvjizdZALrBN4aIywhHHiYvbAldWcSjyebsjQMLKaIZlYgmQ1F577aVuuOGG2B4QB8sWccGsiJPCefPmxbbFAkSgnREgYWU0u3I7CPsViChOcDE5jojQ9v3336969uwZ1xyfE4G2RoCElcH0jhgxQsFQbtqahg8frvBPlMjLzGFlXckvg6GwCSJQaQRIWBlMj7Q/xWWgOf/889XgwYOdesbVHbg9jB492qk8CxGBdkaAhJXB7Mrt4G233RaIW2V2AVuVbauIzM8zZsxoXJA2V2ogQ3iy9+rVKwNN2QQRqDcCJKyU84etILaEWqJSboWdBCJUsm4Dl6PhkwXb1uzZsxvN8nQw5SSxetsgQMJKOZXSEx0e60jDJcVGVliZYavXu3dvqxa6Dgkr5SSxetsgQMJKOZVxF5fRfBhZ8R5gSvBZvcMhQMJKMeU/+tGP1MSJE5stHHLIIeqqq64KtGgjK0YDTQE6q3ZoBEhYKaY/LsqCjawQzWHq1KkpemVVItBxESBhpZh7czsoje02sjrttNPUKaeckqJHViUCHRsBElbC+Ycbwpw5c5q1r7322kZE0TCb1VZbbaXGjRuXsDdWIwJEAAiQsBK+B2HbQdvKCh7tixYtStgTqxEBIqARIGEleBeQDQfZb7TAqRN3/WxkFef1nqB7ViECHRYBElaCqZee7RMmTFDdunVrcfDkaWACcFmFCEQgQMLyfD3gOwVnUS0gJYR+mTt3bqAlhJtZuHChZ+ssTgSIQBQCJCzP92PLLbdU48ePDxCWdABdYYUVGmm9KESACGSLAAnLE8+wDDa6GSRMjQsr49klixMBIvB/CJCwPF+FKMIaNWqU6tOnj2eLLE4EiIArAiQsV6Q0w399YdkmU6ZMURtuuKFnayxOBIiADwIkLA+0wmKvjxkzRm233XYeLbEoESACSRAgYXmiJreEXFl5AsjiRCAFAiSshODdcccdjaw4FCJABIpDgIRVHNbsiQgQgZQIkLBSAsjqRIAIFIcACas4rNkTESACKREgYaUEkNWJABEoDgESVnFYsyciQARSIkDCSgkgqxMBIlAcAiSs4rBmT0SACKREgISVEkBWJwJEoDgESFjFYc2eiAARSIkACSslgKxOBIhAcQiQsIrDmj0RASKQEgESVkoAWZ0IEIHiECBhFYc1eyICRCAlAiSslACyOhEgAsUhQMIqDmv2RASIQEoESFgpAWR1IkAEikOAhFUc1uyJCBCBlAiQsFICyOpEgAgUhwAJqzis2RMRIAIpESBhpQSQ1YkAESgOARJWcVizJyJABFIiQMJKCSCrEwEiUBwCJKzisGZPRIAIpESAhJUSQFYnAkSgOARIWMVhzZ6IABFIiQAJKyWArE4EiEBxCJCwisOaPREBIpASgf8BADBmfAq5RqsAAAAASUVORK5CYII=";

  var config = {
    apiKey: "AIzaSyBRHf3QTmXwrmNX3vnvjYRLroOpLYgUQPk",
    authDomain: "pepeapp-e6fc3.firebaseapp.com",
    databaseURL: "https://pepeapp-e6fc3.firebaseio.com",
    projectId: "pepeapp-e6fc3",
    storageBucket: "pepeapp-e6fc3.appspot.com",
    messagingSenderId: "517134154769"
  };

    firebase.initializeApp(config);
    var database = firebase.database();

    $scope.sebadalMantenimiento_I = "Reparación Nave I El Sebadal";
    $scope.sebadal_I = "El Sebadal Nave I";
    $scope.sebadalMantenimiento_II = "Reparación Nave II El Sebadal";
    $scope.sebadal_II = "El Sebadal Nave II";
    $scope.tiendasLPMantenimiento = "Reparación tienda confección Las Palmas, dos plantas de Almacén y dos de oficinas" +
    				    "\n" + "Reparación tienda J.M. Durán dos plantas" +
    				    "\n" + "Reparación tienda Calzados y almacén";
    $scope.tiendasLP = "Tienda LP";				    
    $scope.arucasMantenimiento = "Reparación tienda confección Arucas y almacén" +
    				"\n" + "Reparación tienda Calzados Arucas y almacén" +
    				"\n" + "Reparación garajes Arucas 2 plantas";
    $scope.arucas = "Arucas";				
    $scope.maspalomasMantenimiento = "Reparación tienda Maspalomas" +
    					"\n" + "Reparación almacén Calzados Maspalomas" +
    					"\n" + "Reparación garajes y zonas comunes de Maspalomas";
    $scope.maspalomas = "Maspalomas";					
	$scope.SietePalmasMantenimiento = "Reparación tienda de 7 Palmas";
	$scope.SietePalmas = "Siete Palmas";								    

function recuperarUltimoParte(){
	var numParteTrabajo=database.ref("partes_de_trabajo").limitToLast(1);
	database.ref("partes_de_trabajo").limitToLast(1).once('value').then(function(snapshot) {
  		// The Promise was "fulfilled" (it succeeded).
  		var ultimoParte = snapshot.val();
  		if(ultimoParte != null){
			angular.forEach(ultimoParte, function(value, key) {
				  $scope.numeroParteAnterior = key;
			});
	  		$scope.$apply(function () {
	            $scope.numeroParteNuevo = ++$scope.numeroParteAnterior;
	        });
  		}else{
	  		$scope.$apply(function () {
	            $scope.numeroParteNuevo = 001;
	        });
  		}
	}, function(error) {
	  // The Promise was rejected.
	  console.error(error);
	});
}

$("#time-2" ).bind( "change", function(event, ui) {
  
var hora2 = ($('#time-1').val()).split(":");
var hora1 = ($('#time-2').val()).split(":");
var t1 = new Date();
var t2 = new Date();

t1.setHours(hora1[0], hora1[1]);
t2.setHours(hora2[0], hora2[1]);

t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes());

$scope.$apply(function () {
	$scope.totalHoras = (t1.getHours() ? t1.getHours() + (t1.getHours() > 1 ? " horas" : " hora") : "") + (t1.getMinutes() ? ", " + t1.getMinutes() + (t1.getMinutes() > 1 ? " minutos" : " minuto") : "");
});
});

$("#lugar").bind( "change", function(event, ui) {
	var options =  parseInt(event.currentTarget.value);
	$('#textarea-1').textinput().val("");
	switch(options) {
    case 1:
    	$scope.esCasa = false;
    	if($scope.mantenimiento == 1){
			$('#textarea-1').textinput().val($scope.sebadalMantenimiento_I);
    	}else{
        	$('#textarea-1').textinput().val($scope.sebadal_I);
    	}
        break;
    case 2:
    	$scope.esCasa = false;
    	if($scope.mantenimiento == 1){
			$('#textarea-1').textinput().val($scope.sebadalMantenimiento_II);
    	}else{
        	$('#textarea-1').textinput().val($scope.sebadal_II);
    	}
        break;
    case 3:
    	$scope.esCasa = false;
    	if($scope.mantenimiento == 1){
			$('#textarea-1').textinput().val($scope.tiendasLPMantenimiento);
    	}else{
        	$('#textarea-1').textinput().val($scope.tiendasLP);
    	}
        break;
    case 4:
    	$scope.esCasa = false;
    	if($scope.mantenimiento == 1){
        	$('#textarea-1').textinput().val($scope.arucasMantenimiento);
    	}else{
			$('#textarea-1').textinput().val($scope.arucas);
    	}
        break;
    case 5:
    	$scope.esCasa = false;
    	if($scope.mantenimiento == 1){
        	$('#textarea-1').textinput().val($scope.maspalomasMantenimiento);
    	}else{
			$('#textarea-1').textinput().val($scope.maspalomas);
    	}
        break;
    case 6:
    	$scope.esCasa = false;
    	if($scope.mantenimiento == 1){
    		$('#textarea-1').textinput().val($scope.SietePalmasMantenimiento);
    	}else{
    		$('#textarea-1').textinput().val($scope.SietePalmas);
    	}
    	break; 
    case 7:
    	$scope.esCasa = true;
		$('#textarea-1').textinput().val("");
    	break;    
}
});

$("#mantenimiento" ).bind( "change", function(event, ui) {
	$scope.mantenimiento = parseInt(event.currentTarget.value);

	if($scope.mantenimiento == 1){
		$('#textarea-1').textinput().val("");
		$scope.mantenimientoText = "Si";
		$scope.averia = 0;
		$('#lugar').selectmenu('enable');
  		$('#time-1').textinput('disable');
		$('#time-2').textinput('disable');
		$scope.totalHoras = "00:00";
	}
	if($scope.mantenimiento == 0){
		$scope.mantenimientoText = "No";
		//$('#lugar').selectmenu('disable');
  		$('#time-1').textinput('enable');
		$('#time-2').textinput('enable');
	}
});

$("#averia" ).bind( "change", function(event, ui) {
	$scope.averia = parseInt(event.currentTarget.value);

	if($scope.averia == 1){
		$('#textarea-1').textinput().val("");
		$scope.averiaText = "Si";
		$scope.mantenimiento = 0;
		$('#mantenimiento').val('0');
		$('#mantenimiento').slider('refresh');

		$('#lugar').selectmenu('enable');
  		$('#time-1').textinput('enable');
		$('#time-2').textinput('enable');
		$scope.totalHoras = "00:00";
	}
	if($scope.averia == 0){
		$scope.averiaText = "No";
  		$('#time-1').textinput('enable');
		$('#time-2').textinput('enable');
	}
});

$("#cerrarPopup").popup("close");

function validation(){
	$scope.errores = 0;
	$scope.erroresText_1 = "";
	$scope.erroresText_2 = "";
	$scope.erroresText_3 = "";
	$scope.erroresText_4 = "";
	$scope.errorHora = "";
    $scope.cliente = $("#select-cliente option:selected").text();
    $scope.mailCliente = $('#correo-cliente').val();
    $scope.es_mantenimiento = $scope.mantenimientoText;
    $scope.es_averia = $scope.averiaText;
    $scope.lugar = $("#lugar option:selected").text();
    $scope.textArea = $('#textarea-1').val();
	$scope.horaEntrada = $('#time-1').val();
	$scope.horaSalida = $('#time-2').val();
	$scope.totalHoras;
	$scope.firmante = $('#firmante').val();
	var canvas = $("#canvas").get(0);
	$scope.imgData = canvas.toDataURL();
	$scope.horaEntrada = $('#time-1').val();

	if($scope.mantenimiento == 0 || $scope.averia == 1){
		if($scope.horaEntrada > $scope.horaSalida){
			++$scope.errores;
			$scope.errorHora = "La hora de entrada no puede ser mayor a la hora de salida";
		}
		if($scope.horaEntrada == ""){
			++$scope.errores;
			$scope.erroresText_2 = "Hay que rellenar la hora de entrada";
		}
		if($scope.horaSalida == ""){
			++$scope.errores;
			$scope.erroresText_3 = "Hay que rellenar la hora de salida";
		}
	}
	if($scope.textArea == ""){
		++$scope.errores;
		$scope.erroresText_1 = "El campo 'trabajo realizado' está vacio";
	}
	if($scope.esCasa == false){
		if($scope.firmante == ""){
			++$scope.errores;
			$scope.erroresText_4 = "Es necesario indicar quién firma";
		}
	}
}

$scope.enviar = function() {
	var canvas = $("#canvas").get(0);
	$scope.imgData = canvas.toDataURL();
	if ((signaturePad.isEmpty()) && ($scope.esCasa == false)) {
		alert('La firma esta vacia');
	}else{
		$scope.checkEmail = $("#check-email").is(":checked");
		//$scope.fecha = $filter('date')($scope.today, "dd-MM-yyyy");
		var fecha = Date.parse($scope.today);  
	    var refPartesTrabajo=database.ref("partes_de_trabajo");		

	    if(($scope.averia == 1) && ($scope.mantenimiento == 0)){
	    	$scope.tipoDeTrabajo = "Avería";
	    }
	    else if(($scope.mantenimiento) == 1 && ($scope.averia== 0)){
			$scope.tipoDeTrabajo = "Mantenimiento";
	    }else{
	    	$scope.tipoDeTrabajo = "Obra";
	    }

		refPartesTrabajo.child($scope.numeroParteNuevo).set({
			fecha: fecha,
			cliente: $scope.cliente,
			mailCliente: $scope.mailCliente,
			tipoDeTrabajo: $scope.tipoDeTrabajo,
			lugar: $scope.lugar,
			trabajo_realizado: $scope.textArea,
			horaEntrada: $scope.horaEntrada,
			horaSalida: $scope.horaSalida,
			totalHoras: $scope.totalHoras,
			firma: $scope.imgData,
			firmante: $scope.firmante,
			checkEmail: $scope.checkEmail
		});
		enviar_email();
		//$scope.reset();
		//recuperarUltimoParte();*/
	}
}

function enviar_email(){
	var fechaEmail = $filter('date')($scope.today, "dd-MM-yyyy");
	var data = {
			numeroDeParte: $scope.numeroParteNuevo,
			fecha: fechaEmail,
			cliente: $scope.cliente,
			mailCliente: $scope.mailCliente,
			tipoDeTrabajo: $scope.tipoDeTrabajo,
			lugar: $scope.lugar,
			trabajo_realizado: $scope.textArea,
			horaEntrada: $scope.horaEntrada,
			horaSalida: $scope.horaSalida,
			totalHoras: $scope.totalHoras,
			firma: $scope.imgData,
			firma2: $scope.firmaPepe,
			firmante: $scope.firmante,
			checkEmail: $scope.checkEmail
	};

    var config = {
        headers : {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
			//'Access-Control-Allow-Origin':'*',
 			//'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS',
			//'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
    }

	var url = 'http://cabildo-tests.es/PepeWeb/recibe-formulario.php'

	$http(
	    {
	       method: 'POST',
	       //url: 'http://triatlononline.es/PepeWeb/recibe-formulario.php', 
	       url: 'http://cabildo-tests.es/PepeWeb/recibe-formulario.php',
	       //url: 'http://localhost/pepeWeb/recibe-formulario.php', 
	       data: data,
	       headers : {
        				'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    				}
	    }).then(function successCallback(response) {
	    	console.log(response);
			alert("Enviado");
			$scope.reset();
			recuperarUltimoParte();
			$scope.close();
	    }, function errorCallback(response) {
	       // called asynchronously if an error occurs
	       // or server returns response with an error status.

	});

} 

$scope.popFirma = function(){
    validation();
    if($scope.errores>=1){
		$("#popupBasic").popup("open");
		window.scrollTo(0, 0);
    }else{
    	var w = screen.width;
    	var h = screen.height;
    	$("#firma").css('width', w);
    	$("#firma").css('height', 900);
		bloquear_campos();
		$("#firma").popup("open");
		window.scrollTo(0, 0);
	}
}

function bloquear_campos(){
	$('#select-cliente').selectmenu('disable');
	$('#mantenimiento').slider('disable');
	$('#averia').slider('disable');
   	$('#textarea-1').textinput('disable');
   	$('#lugar').selectmenu('disable');
	$('#time-1').textinput('disable');
	$('#time-2').textinput('disable');
	$('#firmante').textinput('disable');
}

function desbloquear_campos(){
	$('#select-cliente').selectmenu('enable');
	$('#mantenimiento').slider('enable');
	$('#averia').slider('enable');
   	$('#textarea-1').textinput('enable');
   	$('#lugar').selectmenu('enable');
	$('#time-1').textinput('enable');
	$('#time-2').textinput('enable');
	$('#firmante').textinput('enable');
}


$scope.reset = function() {
	desbloquear_campos();
	$('#mantenimiento').val('0');
	$('#mantenimiento').slider('refresh');
	$('#averia').val('0');
	$('#averia').slider('refresh');
	$scope.totalHoras = "00:00";
   	$('#textarea-1').val('');
	$('#time-1').val('');
	$('#time-2').val('');
	$('#firmante').val('');
	init_Sign_Canvas();
}

$scope.checkConnection = function(){
	$scope.enviar();
   /* var networkState = navigator.connection.effectiveType;

    var states = {};
    if(networkState){
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.CELL]     = 'Cell generic connection';
		states[Connection.NONE]     = 'NO';
        if(states[networkState] === 'NO'){
    		alert("Na hay conexión");
        }else{
    		$scope.enviar();
		}
		
    }else{
    	alert("Na hay conexión");
    }
*/
}

$scope.close = function(){
	navigator.app.exitApp();
}


recuperarUltimoParte();

});