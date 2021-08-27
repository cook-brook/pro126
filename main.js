butter="";
dyanmite="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftwrist=0;
butter_status=0;
dyanmite_status=0;
scorerightwrist=0;


function preload(){
    butter= loadSound("butter.mp3");
    dyanmite= loadSound("Dynamite - BTS.mp3");


}

    function setup(){
        canvas =  createCanvas(600, 500);
        canvas.center();
    
        video = createCapture(VIDEO);
        video.hide();

        
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    }
    function modelLoaded(){
        console.log('poseNet is initialized');
    }

    function gotPoses(results){
        if(results.length > 0){
            console.log(results);
            scoreleftwrist=results[0].pose.keypoints[9].score;
            scorerightwrist=results[0].pose.keypoints[10].score;

            leftWristX=results[0].pose.leftWrist.x;
            leftWristY=results[0].pose.leftWrist.y;
            console.log("leftWristX="+leftWristX+"leftWristY"+leftWristY);
    
            rightWristX=results[0].pose.rightWrist.x;
            rightWristY=results[0].pose.rightWrist.y;
            console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
        }
    
    }
    
    function draw(){
        image(video,0,0,600,500);
        butter_status=butter.isPlaying();
        dyanmite_status=dyanmite.isPlaying();
        fill("#0000FF");
        stroke("#0000FF");
     
        if(scoreleftwrist>0.2){
            circle(leftWristX,leftWristY,20);
            dyanmite.stop();
            if(butter_status==false ) {
                butter.play();
                document.getElementById("song_namee").innerHTML="Song playing butter by BTS";

            }
        }
        if(scorerightwrist>0.2){
            circle(rightWristX.rightWristY,20);
            butter.stop();
            if(dyanmite_status==false){
                dyanmite.play();
                document.getElementById("song_namee").innerHTML="song playing dynamite by BTS";
            }
        }
        

    }