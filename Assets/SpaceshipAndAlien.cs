using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Mono.Data.Sqlite;
using System.Data;
/*using Microsoft.Data.Sqlite;*/
using System;

public class SpaceshipAndAlien : MonoBehaviour
{
   
    public GameObject alien;
    public GameObject spaceship;
    public GameObject alienOption;

    private string dbName = "URI=file:alienAbduction.db";

    // Start is called before the first frame update
    void Start()
    {
        CreateDB();
        /*MultiplyAliens(3);*/
        /*MultiplySpaceships(3);*/
        DisplayQuestion();
        DisplayAnswer();
        DisplayOptions();
        DisplayTimer();
    }

    public void CreateDB()
    {
        using (var connection = new SqliteConnection(dbName))
        {
            connection.Open();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = "CREATE TABLE IF NOT EXISTS Questions (Id VARCHAR(30), QuestionText VARCHAR(200), Answer VARCHAR(50), Option VARCHAR(50), FOREIGN KEY (QuiziID) REFERENCES Quiz(Id))";
                command.CommandText = "CREATE TABLE IF NOT EXISTS Quizzes (Id VARCHAR(30), QuizName VARCHAR(50), Timer INT, Owner VARCHAR(20))";

                command.ExecuteNonQuery();
            }
            connection.Close();
        }
    }

    public void DisplayQuestion()
    {
        using (var connection = new SqliteConnection(dbName))
        {
            connection.Open();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = "SELECT QuestionText FROM Questions WHERE QuiziId = \"00ea167e-a0bd-4889-81fa-433119531680\"";

                using (IDataReader reader = command.ExecuteReader())
                {
                    int i = -1;
                    while (reader.Read())
                    {
                        GameObject spaceshipClone = Instantiate(spaceship, new Vector3(5*i, spaceship.transform.position.y, 0), spaceship.transform.rotation);
                        spaceshipClone.transform.localScale = new Vector3(0.6f, 0.7f, 1.1f);
                        Text question = Component.FindObjectOfType<Text>();
                        question.text += reader["QuestionText"];
                        i++;
                    }
                }
            }
            connection.Close();
        }
    }

    public void DisplayAnswer()
    {
        using (var connection = new SqliteConnection(dbName))
        {
            connection.Open();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = "SELECT Answer FROM Questions WHERE QuiziId = \"00ea167e-a0bd-4889-81fa-433119531680\"";

                using (IDataReader reader = command.ExecuteReader())
                {
                    int i = -1;
                    while (reader.Read())
                    {
                        GameObject alienClone = Instantiate(alien, new Vector3(4 * i - 2, alien.transform.position.y, 0), alien.transform.rotation);
                        alienClone.transform.localScale = new Vector3(0.6f, 0.7f, 1.1f);
                        Text answer = Component.FindObjectOfType<Text>();
                        answer.text += reader["Answer"];
                        i++;
                    }
                }
            }
            connection.Close();
        }
    }
    public void DisplayOptions()
    {
        using (var connection = new SqliteConnection(dbName))
        {
            connection.Open();

            using (var command = connection.CreateCommand())
            {
                command.CommandText = "SELECT Option FROM Questions WHERE QuiziId = \"00ea167e-a0bd-4889-81fa-433119531680\"";

                using (IDataReader reader = command.ExecuteReader())
                {
                    int i = -1;
                    while (reader.Read())
                    {
                        GameObject alienOptionClone = Instantiate(alienOption, new Vector3(4 * i, alienOption.transform.position.y, 0), alienOption.transform.rotation);
                        alienOptionClone.transform.localScale = new Vector3(0.6f, 0.7f, 1.1f);
                        Text option = Component.FindObjectOfType<Text>();
                        option.text += reader["Option"];
                        i++;
                    }
                }
            }
            connection.Close();
        }
    }

    public void DisplayTimer()
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
                        Int32.Parse(reader["Timer"].ToString());
                    }
                }
            }
            connection.Close();
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }

/*    private void MultiplyAliens(int alienNum)
    {
        for (int i = -1; i < alienNum -1; i++)
        {
            GameObject alienClone = Instantiate(alien, new Vector3(5 * i, alien.transform.position.y, 0), alien.transform.rotation);
            alienClone.transform.localScale = new Vector3(0.6f, 0.7f, 1.1f);
            Text answer = Component.FindObjectOfType<Text>();
            answer.text = "Bye " + (1 +i);
           


        }
    }
    private void MultiplySpaceships(int alienNum)
    {
        for (int i = -1; i < alienNum -1; i++)
        {
            GameObject spaceshipClone = Instantiate(spaceship, new Vector3(6 * i, spaceship.transform.position.y* UnityEngine.Random.Range(1,1.5f), 0), spaceship.transform.rotation);
            spaceshipClone.transform.localScale = new Vector3(1f, 1.1f, 1.5f);
            Text question = Component.FindObjectOfType<Text>();
            question.text = "Hello " + (1 + i);
           
        }
    } */  
}
