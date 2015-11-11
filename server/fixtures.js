// Insert sources types
if(Types.find().count() === 0){
    Types.insert({title:"Книга"});
    Types.insert({title:"Интернет страница"});
    Types.insert({title:"Видео"});
    Types.insert({title:"Аудио"});
}

// Insert authors
if(Authors.find().count() === 0){
    Authors.insert({name:"Дарья Донцова"});
    Authors.insert({name:"Стивен Кинг"});
    Authors.insert({name:"Рэй Бредбери"});
}

// Insert tags
if(Tags.find().count() === 0){
    Tags.insert({title:"Css"});
    Tags.insert({title:"JavaScript"});
    Tags.insert({title:"PHP"});
    Tags.insert({title:"Детектив"});
    Tags.insert({title:"Фэнтези"});
    Tags.insert({title:"Фантастика"});
}