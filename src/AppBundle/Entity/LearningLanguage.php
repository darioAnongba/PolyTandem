<?php
/**
 * Created by PhpStorm.
 * User: dario
 * Date: 12.03.2016
 * Time: 15:03
 */

namespace AppBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class LearningLanguage
 *
 * @ORM\Entity
 * @ORM\Table(name="learning_languages")
 */
class LearningLanguage
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="language", type="string")
     * @Assert\Language()
     */
    protected $language;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="learningLanguages")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    protected $user;

    /**
     * @var integer
     *
     * @ORM\Column(name="points", type="integer")
     * @Assert\Type(type="integer")
     * @Assert\NotBlank()
     */
    protected $points;

    /**
     * @var string
     *
     * @ORM\Column(name="level", type="string", length=2)
     * @Assert\Choice(callback = "getLevels")
     */
    protected $level;

    public static function getLevels () {
        return array('a1', 'a2', 'b1', 'b2', 'c1', 'c2');
    }
    

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set language
     *
     * @param string $language
     *
     * @return LearningLanguage
     */
    public function setLanguage($language)
    {
        $this->language = $language;

        return $this;
    }

    /**
     * Get language
     *
     * @return string
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * Set points
     *
     * @param integer $points
     *
     * @return LearningLanguage
     */
    public function setPoints($points)
    {
        $this->points = $points;

        return $this;
    }

    /**
     * Get points
     *
     * @return integer
     */
    public function getPoints()
    {
        return $this->points;
    }

    /**
     * Set level
     *
     * @param string $level
     *
     * @return LearningLanguage
     */
    public function setLevel($level)
    {
        $this->level = $level;

        return $this;
    }

    /**
     * Get level
     *
     * @return string
     */
    public function getLevel()
    {
        return $this->level;
    }

    /**
     * Set user
     *
     * @param \AppBundle\Entity\User $user
     *
     * @return LearningLanguage
     */
    public function setUser(\AppBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \AppBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }
}
