using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class CorrectAnswer : MonoBehaviour
{
    private TMP_Text _text;
    private int _score;

    // Start is called before the first frame update
    public static CorrectAnswer Instance { get; private set; }

    private void Awake()
    {
        _text = GetComponent<TMP_Text>();
        Instance = this;
    }

    public void AddScore(int value, Alien alien)
    {
            if (alien != null && alien.gameObject.tag == "Answer")
            {
                _score += value;
                _text.SetText(_score.ToString());
            }
    }
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {

    }
}
