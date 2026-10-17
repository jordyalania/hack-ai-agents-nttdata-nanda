# Diccionario de los archivos bancarios locales

Calculado leyendo los CSV completos. Los identificadores se conservan como texto. Los ejemplos son filas puntuales, no una muestra representativa.

## HI-Small_Trans

Archivo: `data/banca/raw/ibm-aml/HI-Small_Trans.csv`. **5,078,345 filas**, 11 columnas.

Etiqueta `Is Laundering`: 5,177 filas con valor 1 (0.1019%).

| Campo leído | Encabezado original | Tipo lógico | Vacíos | Ejemplo |
| --- | --- | --- | ---: | --- |
| `Timestamp` | `Timestamp` | fecha/hora | 0 | 2022/09/01 00:20 |
| `From Bank` | `From Bank` | identificador (texto) | 0 | 010 |
| `Account` | `Account` | identificador (texto) | 0 | 8000EBD30 |
| `To Bank` | `To Bank` | identificador (texto) | 0 | 010 |
| `Account.1` | `Account` | identificador (texto) | 0 | 8000EBD30 |
| `Amount Received` | `Amount Received` | importe decimal | 0 | 3697.34 |
| `Receiving Currency` | `Receiving Currency` | categoría | 0 | US Dollar |
| `Amount Paid` | `Amount Paid` | importe decimal | 0 | 3697.34 |
| `Payment Currency` | `Payment Currency` | categoría | 0 | US Dollar |
| `Payment Format` | `Payment Format` | categoría | 0 | Reinvestment |
| `Is Laundering` | `Is Laundering` | etiqueta (0/1) | 0 | 0 |

### Valores de `Receiving Currency`

| Valor | Filas |
| --- | ---: |
| US Dollar | 1,879,341 |
| Euro | 1,172,017 |
| Swiss Franc | 237,884 |
| Yuan | 206,551 |
| Shekel | 194,988 |
| Rupee | 192,065 |
| UK Pound | 181,255 |
| Ruble | 157,361 |
| Yen | 156,319 |
| Bitcoin | 148,151 |
| Canadian Dollar | 141,357 |
| Australian Dollar | 138,511 |
| Mexican Peso | 111,030 |
| Saudi Riyal | 89,971 |
| Brazil Real | 71,544 |

### Valores de `Payment Currency`

| Valor | Filas |
| --- | ---: |
| US Dollar | 1,895,172 |
| Euro | 1,168,297 |
| Swiss Franc | 234,860 |
| Yuan | 213,752 |
| Shekel | 192,184 |
| Rupee | 190,202 |
| UK Pound | 180,738 |
| Yen | 155,209 |
| Ruble | 155,178 |
| Bitcoin | 146,066 |
| Canadian Dollar | 140,042 |
| Australian Dollar | 136,769 |
| Mexican Peso | 110,159 |
| Saudi Riyal | 89,014 |
| Brazil Real | 70,703 |

### Valores de `Payment Format`

| Valor | Filas |
| --- | ---: |
| Cheque | 1,864,331 |
| Credit Card | 1,323,324 |
| ACH | 600,797 |
| Cash | 490,891 |
| Reinvestment | 481,056 |
| Wire | 171,855 |
| Bitcoin | 146,091 |

### Valores de `Is Laundering`

| Valor | Filas |
| --- | ---: |
| 0 | 5,073,168 |
| 1 | 5,177 |

## HI-Small_accounts

Archivo: `data/banca/raw/ibm-aml/HI-Small_accounts.csv`. **518,581 filas**, 5 columnas.

| Campo leído | Encabezado original | Tipo lógico | Vacíos | Ejemplo |
| --- | --- | --- | ---: | --- |
| `Bank Name` | `Bank Name` | texto | 0 | Portugal Bank #4507 |
| `Bank ID` | `Bank ID` | identificador (texto) | 0 | 331579 |
| `Account Number` | `Account Number` | identificador (texto) | 0 | 80B779D80 |
| `Entity ID` | `Entity ID` | identificador (texto) | 0 | 80062E240 |
| `Entity Name` | `Entity Name` | texto | 0 | Sole Proprietorship #50438 |

## LI-Small_Trans

Archivo: `data/banca/raw/ibm-aml/LI-Small_Trans.csv`. **6,924,049 filas**, 11 columnas.

Etiqueta `Is Laundering`: 3,565 filas con valor 1 (0.0515%).

| Campo leído | Encabezado original | Tipo lógico | Vacíos | Ejemplo |
| --- | --- | --- | ---: | --- |
| `Timestamp` | `Timestamp` | fecha/hora | 0 | 2022/09/01 00:08 |
| `From Bank` | `From Bank` | identificador (texto) | 0 | 011 |
| `Account` | `Account` | identificador (texto) | 0 | 8000ECA90 |
| `To Bank` | `To Bank` | identificador (texto) | 0 | 011 |
| `Account.1` | `Account` | identificador (texto) | 0 | 8000ECA90 |
| `Amount Received` | `Amount Received` | importe decimal | 0 | 3195403.00 |
| `Receiving Currency` | `Receiving Currency` | categoría | 0 | US Dollar |
| `Amount Paid` | `Amount Paid` | importe decimal | 0 | 3195403.00 |
| `Payment Currency` | `Payment Currency` | categoría | 0 | US Dollar |
| `Payment Format` | `Payment Format` | categoría | 0 | Reinvestment |
| `Is Laundering` | `Is Laundering` | etiqueta (0/1) | 0 | 0 |

### Valores de `Receiving Currency`

| Valor | Filas |
| --- | ---: |
| US Dollar | 2,537,242 |
| Euro | 1,596,407 |
| Yuan | 474,978 |
| Rupee | 344,237 |
| Bitcoin | 313,196 |
| Saudi Riyal | 261,882 |
| Australian Dollar | 213,905 |
| Yen | 211,631 |
| Brazil Real | 202,717 |
| Canadian Dollar | 177,966 |
| Shekel | 177,298 |
| Swiss Franc | 140,076 |
| UK Pound | 98,000 |
| Ruble | 89,140 |
| Mexican Peso | 85,374 |

### Valores de `Payment Currency`

| Valor | Filas |
| --- | ---: |
| US Dollar | 2,553,887 |
| Euro | 1,595,859 |
| Yuan | 483,603 |
| Rupee | 340,641 |
| Bitcoin | 309,240 |
| Saudi Riyal | 257,948 |
| Australian Dollar | 211,155 |
| Yen | 210,125 |
| Brazil Real | 199,840 |
| Canadian Dollar | 176,069 |
| Shekel | 174,530 |
| Swiss Franc | 138,251 |
| UK Pound | 99,668 |
| Ruble | 88,492 |
| Mexican Peso | 84,741 |

### Valores de `Payment Format`

| Valor | Filas |
| --- | ---: |
| Cheque | 2,503,158 |
| Credit Card | 1,780,389 |
| ACH | 796,581 |
| Cash | 655,688 |
| Reinvestment | 650,458 |
| Bitcoin | 309,208 |
| Wire | 228,567 |

### Valores de `Is Laundering`

| Valor | Filas |
| --- | ---: |
| 0 | 6,920,484 |
| 1 | 3,565 |

## LI-Small_accounts

Archivo: `data/banca/raw/ibm-aml/LI-Small_accounts.csv`. **712,688 filas**, 5 columnas.

| Campo leído | Encabezado original | Tipo lógico | Vacíos | Ejemplo |
| --- | --- | --- | ---: | --- |
| `Bank Name` | `Bank Name` | texto | 0 | China Bank #2820 |
| `Bank ID` | `Bank ID` | identificador (texto) | 0 | 314693 |
| `Account Number` | `Account Number` | identificador (texto) | 0 | 81B86A280 |
| `Entity ID` | `Entity ID` | identificador (texto) | 0 | 800D8CCF0 |
| `Entity Name` | `Entity Name` | texto | 0 | Corporation #41344 |

## SAML-D

Archivo: `data/banca/raw/saml-d/SAML-D.csv`. **9,504,852 filas**, 12 columnas.

Etiqueta `Is_laundering`: 9,873 filas con valor 1 (0.1039%).

| Campo leído | Encabezado original | Tipo lógico | Vacíos | Ejemplo |
| --- | --- | --- | ---: | --- |
| `Time` | `Time` | fecha/hora | 0 | 10:35:19 |
| `Date` | `Date` | fecha/hora | 0 | 2022-10-07 |
| `Sender_account` | `Sender_account` | identificador (texto) | 0 | 8724731955 |
| `Receiver_account` | `Receiver_account` | identificador (texto) | 0 | 2769355426 |
| `Amount` | `Amount` | importe decimal | 0 | 1459.15 |
| `Payment_currency` | `Payment_currency` | categoría | 0 | UK pounds |
| `Received_currency` | `Received_currency` | categoría | 0 | UK pounds |
| `Sender_bank_location` | `Sender_bank_location` | categoría | 0 | UK |
| `Receiver_bank_location` | `Receiver_bank_location` | categoría | 0 | UK |
| `Payment_type` | `Payment_type` | categoría | 0 | Cash Deposit |
| `Is_laundering` | `Is_laundering` | etiqueta (0/1) | 0 | 0 |
| `Laundering_type` | `Laundering_type` | etiqueta de tipología | 0 | Normal_Cash_Deposits |

### Valores de `Payment_currency`

| Valor | Filas |
| --- | ---: |
| UK pounds | 9,099,293 |
| Euro | 117,164 |
| Turkish lira | 27,996 |
| Swiss franc | 27,492 |
| Dirham | 27,263 |
| Pakistani rupee | 27,196 |
| Naira | 27,143 |
| US dollar | 26,061 |
| Yen | 25,562 |
| Moroccan dirham | 25,395 |
| Mexican Peso | 24,852 |
| Albanian lek | 24,778 |
| Indian rupee | 24,657 |

### Valores de `Received_currency`

| Valor | Filas |
| --- | ---: |
| UK pounds | 8,783,655 |
| Euro | 231,911 |
| Pakistani rupee | 45,993 |
| Yen | 45,814 |
| Moroccan dirham | 45,748 |
| Albanian lek | 45,736 |
| Mexican Peso | 45,255 |
| Naira | 45,046 |
| Indian rupee | 43,757 |
| US dollar | 43,664 |
| Swiss franc | 42,931 |
| Dirham | 42,797 |
| Turkish lira | 42,545 |

### Valores de `Sender_bank_location`

| Valor | Filas |
| --- | ---: |
| UK | 9,183,088 |
| Turkey | 20,902 |
| Switzerland | 20,503 |
| Pakistan | 20,346 |
| UAE | 20,081 |
| Nigeria | 20,027 |
| Spain | 19,391 |
| Germany | 19,259 |
| USA | 19,027 |
| Italy | 18,895 |
| France | 18,702 |
| Japan | 18,468 |
| Morocco | 18,437 |
| Austria | 18,050 |
| Mexico | 17,662 |
| Albania | 17,648 |
| India | 17,596 |
| Netherlands | 16,770 |

### Valores de `Receiver_bank_location`

| Valor | Filas |
| --- | ---: |
| UK | 8,864,634 |
| Pakistan | 38,980 |
| Austria | 38,844 |
| Albania | 38,783 |
| Japan | 38,729 |
| Morocco | 38,704 |
| Germany | 38,540 |
| France | 38,512 |
| Mexico | 38,385 |
| Nigeria | 38,272 |
| Netherlands | 37,314 |
| Spain | 37,288 |
| India | 36,936 |
| USA | 36,850 |
| Italy | 36,517 |
| Switzerland | 36,081 |
| UAE | 35,897 |
| Turkey | 35,586 |

### Valores de `Payment_type`

| Valor | Filas |
| --- | ---: |
| Credit card | 2,012,909 |
| Debit card | 2,012,103 |
| Cheque | 2,011,419 |
| ACH | 2,008,807 |
| Cross-border | 933,931 |
| Cash Withdrawal | 300,477 |
| Cash Deposit | 225,206 |

### Valores de `Is_laundering`

| Valor | Filas |
| --- | ---: |
| 0 | 9,494,979 |
| 1 | 9,873 |

### Valores de `Laundering_type`

| Valor | Filas |
| --- | ---: |
| Normal_Small_Fan_Out | 3,477,717 |
| Normal_Fan_Out | 2,302,220 |
| Normal_Fan_In | 2,104,285 |
| Normal_Group | 528,351 |
| Normal_Cash_Withdrawal | 305,031 |
| Normal_Cash_Deposits | 223,801 |
| Normal_Periodical | 210,526 |
| Normal_Plus_Mutual | 155,041 |
| Normal_Mutual | 125,335 |
| Normal_Foward | 42,031 |
| Normal_single_large | 20,641 |
| Structuring | 1,870 |
| Cash_Withdrawal | 1,334 |
| Deposit-Send | 945 |
| Smurfing | 932 |
| Layered_Fan_In | 656 |
| Layered_Fan_Out | 529 |
| Stacked Bipartite | 506 |
| Behavioural_Change_1 | 394 |
| Bipartite | 383 |
| Cycle | 382 |
| Fan_In | 364 |
| Gather-Scatter | 354 |
| Behavioural_Change_2 | 345 |
| Scatter-Gather | 338 |
| Single_large | 250 |
| Fan_Out | 237 |
| Over-Invoicing | 54 |
