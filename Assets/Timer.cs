using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using Mono.Data.Sqlite;
using System.Data;
using System;
using System.Globalization;

public class Timer : MonoBehaviour
{

    public float timeValue = 90;
    public Text timerText;
    public Text comment = null;
    /*public Text answer = null;*/
    public Spaceship[] spaceships;

    private string dbName = "URI=file:alienAbduction.db";
    private void Start()
    {
        timeValue = DisplayTimer();
    }
    void Update()
    {
        spaceships = FindObjectsOfType<Spaceship>();

        
        if (timeValue > 0)
        {
            
            timeValue -= Time.deltaTime;
        }
        else
        {
            timeValue = 0;
        }

        DisplayTime(timeValue);
/*        CheckCorrectAnswers();*/
    }

    public void DisplayTime(float timeToDisplay)
    {
        if(timeToDisplay < 0)
        {
            timeToDisplay = 0;
        }
        
        float minutes = Mathf.FloorToInt(timeToDisplay / 60);
        float seconds = Mathf.FloorToInt(timeToDisplay % 60);

        timerText.text = string.Format("{0:00}:{1:00}", minutes, seconds);

        int spaceshipNum = spaceships.Length / 3 - 1;
        /*Debug.Log(spaceshipNum);*/

        if (Mathf.Approximately(minutes, 0) && seconds <= 0 && spaceshipNum > 1)
        {
            SceneManager.LoadScene("GameOver");
            /*comment.text = "Time's up!";*/
            timeToDisplay = 0;
            Debug.Log("go");
        }
        else if (spaceshipNum <= 1)
        {
            SceneManager.LoadScene("GameOver");
            /*comment.text = "All Questions Answered!";*/
            timeToDisplay = 0;
        }
        
    }

    public float DisplayTimer()
    {
        using (var connection = new SqliteConnection(dbName))
        {
            connection.Open();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = "SELECT Timer FROM Quizzes WHERE Id = \"00EA167E-A0BD-4889-81FA-433119531680\"";

                using (IDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        timeValue = float.Parse(reader["Timer"].ToString(), CultureInfo.InvariantCulture.NumberFormat);
                        /*Debug.Log(timeValue);*/
                        return timeValue;
                    }
                }
            }
            connection.Close();
            return timeValue;
        }
    }
}
